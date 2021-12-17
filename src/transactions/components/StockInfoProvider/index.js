import React from 'react';

import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';

import queries from '../../queries';
import { StockInfoContext } from './context';



const StockInfoProvider = ({ children, ticker }) => {
  const missingTicker = !ticker;
  const variables = { ticker };
  const { data, error, loading } = useQuery(queries.getStockInfo, { skip: missingTicker, variables });

  const value = { error, loadingStock: loading, stock: data?.stockCurrentInfo };
  return (
    <StockInfoContext.Provider value={value}>
      {children}
    </StockInfoContext.Provider>
  )
}

StockInfoProvider.propTypes = {
  children: PropTypes.node,
  ticker: PropTypes.string,
}

export default StockInfoProvider;
