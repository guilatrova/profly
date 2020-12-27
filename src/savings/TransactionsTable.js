import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import queries from './queries';
import { useQuery } from '@apollo/client';
import { formatDateTimeOutput } from "../utils/dates";
import { getCurrencyFormattedNumber } from '../utils/numberFormat';

// TODO: Use i18n
// TODO: Implement pagination and order by
const TransactionsTable = () => {
  const { loading, error, data: transactionsData} = useQuery(queries.listTransactions);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error <pre>{JSON.stringify(error)}</pre></p>;

  return (
    <>
      <Title>Recent Transactions</Title>
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
          {transactionsData.transactions.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.stock.name}</TableCell>
              <TableCell>{formatDateTimeOutput(row.performedAt)}</TableCell>
              <TableCell align="right">{getCurrencyFormattedNumber(row.strikePrice)}</TableCell>
              <TableCell align="right">{row.units}</TableCell>
              <TableCell align="right">{getCurrencyFormattedNumber(row.units * row.strikePrice)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default TransactionsTable;
