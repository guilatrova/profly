import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { formatDateTimeOutput } from '../../../utils/dates';
import { formatCurrency } from '../../../utils/money';
import { transactionPropType } from '../../types';
import TickerLink from '../../../core/components/TickerLink';
import Actions from './Actions';
import { useMutation } from '@apollo/client';
import queries from '../../queries';

import { Emoji } from 'emoji-mart'

const useStyles = makeStyles((theme) => ({
  boughtUnits: {
    color: theme.palette.success.main,
  },
  soldUnits: {
    color: theme.palette.error.main,
  },
}));

const DEFAULT_EMOTION = 'neutral_face';


const ContentRow = ({ row, alignUnits, displayStock }) => {
  const classes = useStyles();
  const [handleDelete] = useMutation(queries.deleteTransaction, { variables: { id: row.id }});

  return (
    <TableRow hover>
      {displayStock && (
        <TableCell>
          <TickerLink>{row.stock.ticker}</TickerLink>
        </TableCell>
      )}
      <TableCell
        align={alignUnits}
        className={row.units >= 0 ? classes.boughtUnits : classes.soldUnits}
      >
        {row.units}
      </TableCell>
      <TableCell align="center">
        <Emoji emoji={row.emotion || DEFAULT_EMOTION} size={24} set="twitter" />
      </TableCell>
      <TableCell align="right">{formatCurrency(row.strikePrice, row.stock.currency)}</TableCell>
      <TableCell align="right">{formatCurrency(row.value, row.stock.currency)}</TableCell>
      <TableCell align="right">
        {formatDateTimeOutput(row.performedAt)}
      </TableCell>
      <TableCell align="right">
        <Actions onDelete={handleDelete} />
      </TableCell>
    </TableRow>
  );
};

ContentRow.propTypes = {
  row: transactionPropType.isRequired,
  alignUnits: PropTypes.string.isRequired,
  displayStock: PropTypes.bool,
};

export default ContentRow;
