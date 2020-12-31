import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import queries from '../../queries';
import ErrorHandler from '../../../core/components/ApolloErrorHandler';



const StockInfoProvider = ({ ticker, children }) => {
  const missingTicker = !ticker;
  const variables = { ticker };
  const { loading, error, data } = useQuery(queries.getStockInfo, { variables, skip: missingTicker });

  if (error) return <ErrorHandler>{error}</ErrorHandler>;

  return children(data?.stockCurrentInfo, loading);
}

StockInfoProvider.propTypes = {
  children: PropTypes.func.isRequired,
  ticker: PropTypes.string,
}

export default StockInfoProvider;
