import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { formatDateTimeOutput } from '../../utils/dates';
import { formatCurrency } from '../../utils/money';
import { transactionsPropType } from '../types';
import TickerLink from '../../core/components/TickerLink';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  boughtUnits: {
    color: theme.palette.success.main,
  },
  soldUnits: {
    color: theme.palette.error.main,
  },
}));

const LoadingRows = ({ displayStock }) => {
  const rowsCount = 5;
  const cellsCount = displayStock ? 5 : 4;
  const rows = Array(rowsCount).fill();
  const cells = Array(cellsCount).fill();

  return (
    <>
      {rows.map((r, ridx) => {
        return (
          <TableRow key={ridx} hover>
            {cells.map((c, cidx) => <TableCell key={cidx}><Skeleton /></TableCell>)}
          </TableRow>
        )
      })}
    </>
  );
};

const TableContentRow = ({ row, alignUnits, displayStock }) => {
  const classes = useStyles();

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
      <TableCell align="right">{formatCurrency(row.strikePrice)}</TableCell>
      <TableCell align="right">{formatCurrency(row.value)}</TableCell>
      <TableCell align="right">
        {formatDateTimeOutput(row.performedAt)}
      </TableCell>
    </TableRow>
  );
};

// TODO: Use i18n
// TODO: Implement pagination and order by
const TransactionsTable = ({ data = [], loading = false, displayStock = true }) => {
  const classes = useStyles();
  const alignUnits = displayStock ? 'right' : 'inherit';

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          {displayStock && <TableCell>Stock</TableCell>}
          <TableCell align={alignUnits}>Units</TableCell>
          <TableCell align="right">Strike Price</TableCell>
          <TableCell align="right">Value</TableCell>
          <TableCell align="right">Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {loading ? <LoadingRows displayStock={displayStock} /> :data.map((row) => (
          <TableContentRow
            key={row.id}
            row={row}
            alignUnits={alignUnits}
            displayStock={displayStock}
          />
        ))}
      </TableBody>
    </Table>
  );
};

TransactionsTable.propTypes = {
  data: transactionsPropType.isRequired,
  displayStock: PropTypes.bool,
};

export default TransactionsTable;
