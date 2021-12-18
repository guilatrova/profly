/* eslint-disable react/prop-types */
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import TransactionEventEntry from './TransactionEventEntry';


const useStyles = makeStyles({
  root: {
    background: '#fff',
    borderRadius: 15,
    padding: "2px 10px"
  },
});


const TransactionsTooltip = ({ active, formatter, label, labelFormatter, payload }) => {
  const classes = useStyles();

  const hasPayload = !!payload.length;
  if (active && hasPayload) {
    const transactions = payload[0].payload.transactions;
    const hasTransactions = !!transactions.length;

    return (
      <div className={classes.root}>
        <h4 className="label">{`${labelFormatter(label)}`}</h4>
        <p>{`${formatter(payload[0].value)}`}</p>

        {hasTransactions &&
          <>
            <h5>Transactions</h5>
            {transactions.map(t => <TransactionEventEntry key={t.id} transaction={t} />)}
          </>
        }
      </div>
    );
  }

  return null;
};

export default TransactionsTooltip;
