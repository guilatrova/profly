import React from 'react';

import PropTypes from 'prop-types';

import { stocksSummaryPropType } from '../../types';
import StockCard from './StockCard';


// TODO: Use i18n
// TODO: Implement pagination and order by
const StocksTable = ({
  data = [],
  loading = false
}) => {
  return (
    <div>
      {data.map(stock => (<StockCard key={stock.ticker} data={stock} />))}
    </div>
  );
};

StocksTable.propTypes = {
  data: stocksSummaryPropType,
  loading: PropTypes.bool
};

export default StocksTable;
