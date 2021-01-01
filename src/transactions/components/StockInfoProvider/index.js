import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import queries from '../../queries';
import { StockInfoContext } from './context';



const StockInfoProvider = ({ ticker, children }) => {
  const missingTicker = !ticker;
  const variables = { ticker };
  const { loading, error, data } = useQuery(queries.getStockInfo, { variables, skip: missingTicker });

  const value = { stock: data?.stockCurrentInfo, loadingStock: loading, error };
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
