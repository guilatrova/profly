import React from 'react';
import PropTypes from 'prop-types';
// import TransactionCard from './TransactionCard';


// TODO: Use i18n
// TODO: Implement pagination and order by
const TransactionsList = ({
  data = [],
  loading = false,
  mode,
}) => {
  return (
    data.map((row) => (
      <pre key={row.id}>
        {JSON.stringify(row)}
      </pre>
      // <TransactionCard
      //   key={row.id}
      //   row={row}
      //   mode={mode}
      // />
    ))
  )
}

TransactionsList.propTypes = {
  data: PropTypes.any,
  loading: PropTypes.bool,
};

export default TransactionsList;
