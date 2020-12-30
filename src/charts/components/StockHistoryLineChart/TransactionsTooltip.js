/* eslint-disable react/prop-types */
import React from 'react';
import TransactionEventEntry from './TransactionEventEntry';


const TransactionsTooltip = ({ active, label, labelFormatter, formatter, payload }) => {
  if (active) {
    const transactions = payload[0].payload.transactions;
    const hasTransactions = !!transactions.length;

    return (
      <div className="custom-tooltip">
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
