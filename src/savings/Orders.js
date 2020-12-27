import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import queries from './queries';
import { useQuery } from '@apollo/client';

// TODO: Use i18n
// TODO: Implement pagination
export default function Orders() {
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
              <TableCell>{row.performedAt}</TableCell>
              <TableCell align="right">{row.strikePrice}</TableCell>
              <TableCell align="right">{row.units}</TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
