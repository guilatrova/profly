import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { formatDateTimeOutput } from "../../utils/dates";
import { formatCurrency } from '../../utils/money';
import { transactionsPropType } from '../types';
import TickerLink from '../../core/components/TickerLink';

const useStyles = makeStyles((theme) => ({
  boughtUnits: {
    color: theme.palette.success.main,
  },
  soldUnits: {
    color: theme.palette.error.main
  }
}));

// TODO: Use i18n
// TODO: Implement pagination and order by
const TransactionsTable = ({ data }) => {
  const classes = useStyles();

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Stock</TableCell>
          <TableCell align="right">Units</TableCell>
          <TableCell align="right">Strike Price</TableCell>
          <TableCell align="right">Value</TableCell>
          <TableCell align="right">Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id} hover>
            <TableCell><TickerLink>{row.stock.ticker}</TickerLink></TableCell>
            <TableCell align="right" className={row.units >= 0 ? classes.boughtUnits : classes.soldUnits}>{row.units}</TableCell>
            <TableCell align="right">{formatCurrency(row.strikePrice)}</TableCell>
            <TableCell align="right">{formatCurrency(row.value)}</TableCell>
            <TableCell align="right">{formatDateTimeOutput(row.performedAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

TransactionsTable.propTypes = {
  data: transactionsPropType
};

export default TransactionsTable;
