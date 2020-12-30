import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { formatDateTimeOutput } from "../../utils/dates";
import { getCurrencyFormattedNumber } from '../../utils/numberFormat';
import { transactionsPropType } from '../types';
import TickerLink from '../../core/components/TickerLink';

// TODO: Use i18n
// TODO: Implement pagination and order by
const TransactionsTable = ({ data }) => {

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Stock</TableCell>
          <TableCell>Date</TableCell>
          <TableCell align="right">Strike Price</TableCell>
          <TableCell align="right">Units</TableCell>
          <TableCell align="right">Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell><TickerLink>{row.stock.ticker}</TickerLink></TableCell>
            <TableCell>{formatDateTimeOutput(row.performedAt)}</TableCell>
            <TableCell align="right">{getCurrencyFormattedNumber(row.strikePrice)}</TableCell>
            <TableCell align="right">{row.units}</TableCell>
            <TableCell align="right">{getCurrencyFormattedNumber(row.value)}</TableCell>
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
