import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { stocksSummaryPropType } from '../../types';
import LoadingRows from '../../../core/components/LoadingRows';
import ContentRow from './ContentRow';


// TODO: Use i18n
// TODO: Implement pagination and order by
const StocksTable = ({
  data = [],
  loading = false
}) => {
  const cellsCount = 3;

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Stock</TableCell>
          <TableCell align="right">Units</TableCell>
          <TableCell align="right">Value</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {loading ? (
          <LoadingRows cellsCount={cellsCount} />
        ) : (
          data.map((row) => (
            <ContentRow key={row.id} row={row} />
          ))
        )}
      </TableBody>
    </Table>
  );
};

StocksTable.propTypes = {
  data: stocksSummaryPropType,
  loading: PropTypes.bool
};

export default StocksTable;
