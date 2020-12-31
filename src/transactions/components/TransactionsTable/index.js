import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { transactionsPropType } from '../../types';
import LoadingRows from './LoadingRows';
import ContentRow from './ContentRow';


// TODO: Use i18n
// TODO: Implement pagination and order by
const TransactionsTable = ({
  data = [],
  loading = false,
  displayStock = true,
}) => {
  const alignUnits = displayStock ? 'right' : 'inherit';
  const cellsCount = displayStock ? 6 : 5;

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          {displayStock && <TableCell>Stock</TableCell>}
          <TableCell align={alignUnits}>Units</TableCell>
          <TableCell align="right">Strike Price</TableCell>
          <TableCell align="right">Value</TableCell>
          <TableCell align="right">Date</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {loading ? (
          <LoadingRows cellsCount={cellsCount} />
        ) : (
          data.map((row) => (
            <ContentRow
              key={row.id}
              row={row}
              alignUnits={alignUnits}
              displayStock={displayStock}
            />
          ))
        )}
      </TableBody>
    </Table>
  );
};

TransactionsTable.propTypes = {
  data: transactionsPropType,
  loading: PropTypes.bool,
  displayStock: PropTypes.bool,
};

export default TransactionsTable;
