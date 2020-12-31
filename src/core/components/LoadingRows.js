import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton';


const LoadingRows = ({ cellsCount, rowsCount = 5 }) => {
  const rows = Array(rowsCount).fill();
  const cells = Array(cellsCount).fill();

  return (
    <>
      {rows.map((r, ridx) => {
        return (
          <TableRow key={ridx} hover>
            {cells.map((c, cidx) => (
              <TableCell key={cidx}>
                <Skeleton />
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </>
  );
};

LoadingRows.propTypes = {
  cellsCount:  PropTypes.number.isRequired,
  rowsCount: PropTypes.number,
}

export default LoadingRows;
