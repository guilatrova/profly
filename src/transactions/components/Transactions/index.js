import React from 'react';
import PropTypes from 'prop-types';
import { transactionsPropType } from '../../types';
import TransactionCard from './TransactionCard';


// TODO: Use i18n
// TODO: Implement pagination and order by
const TransactionsList = ({
  data = [],
  loading = false,
  mode,
}) => {
  return (
    data.map((row) => (
      <TransactionCard
        key={row.id}
        row={row}
        mode={mode}
      />
    ))
  )
}

TransactionsList.propTypes = {
  data: transactionsPropType,
  loading: PropTypes.bool,
  mode: PropTypes.oneOf(['ALL', 'STOCK']),
};

export default TransactionsList;
