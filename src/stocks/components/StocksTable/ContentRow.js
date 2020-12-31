import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { formatCurrency } from '../../../utils/money';
import { stockSummaryPropType } from '../../types';
import TickerLink from '../../../core/components/TickerLink';

const ContentRow = ({ row }) => {
  return (
    <TableRow hover>
      <TableCell>
        <TickerLink>{row.name}</TickerLink>
      </TableCell>
      <TableCell align="right">{row.units}</TableCell>
      <TableCell align="right">{formatCurrency(row.value)}</TableCell>
    </TableRow>
  );
};

ContentRow.propTypes = {
  row: stockSummaryPropType.isRequired,
};

export default ContentRow;
