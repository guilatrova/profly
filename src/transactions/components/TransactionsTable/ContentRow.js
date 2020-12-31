import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { formatDateTimeOutput } from '../../../utils/dates';
import { formatCurrency } from '../../../utils/money';
import { transactionPropType } from '../../types';
import TickerLink from '../../../core/components/TickerLink';

const useStyles = makeStyles((theme) => ({
  boughtUnits: {
    color: theme.palette.success.main,
  },
  soldUnits: {
    color: theme.palette.error.main,
  },
}));


const ContentRow = ({ row, alignUnits, displayStock }) => {
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

ContentRow.propTypes = {
  row: transactionPropType.isRequired,
  alignUnits: PropTypes.string.isRequired,
  displayStock: PropTypes.bool,
};

export default ContentRow;