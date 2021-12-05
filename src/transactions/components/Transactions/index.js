import React from 'react';
import PropTypes from 'prop-types';
import { transactionsPropType } from '../../types';
import TransactionCard from './TransactionCard';


// TODO: Use i18n
// TODO: Implement pagination and order by
const TransactionsList = ({
  data = [],
  loading = false,
  displayStock = true,
}) => {
  return (
    data.map((row) => (
      <TransactionCard
        key={row.id}
        row={row}
        displayStock={displayStock}
      />
    ))
  )
}

TransactionsList.propTypes = {
  data: transactionsPropType,
  loading: PropTypes.bool,
  displayStock: PropTypes.bool,
};

export default TransactionsList;
