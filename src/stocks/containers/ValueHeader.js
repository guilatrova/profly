import React from 'react';

import { useQuery } from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';

import ErrorHandler from '../../core/components/ApolloErrorHandler';
import { formatCurrency } from '../../utils/money';
import queries from '../queries';


const ValueHeader = ({ ticker }) => {
  const { data, error, loading } = useQuery(queries.stockSummary, { variables: { ticker }});

  if (error) return <ErrorHandler operation="stock summary">{error}</ErrorHandler>;

  const summary = data?.summary;
  const value = summary?.currentValue;
  const currency = summary?.currency;

  return (
    <Typography component="h4" variant="h2">
      {loading ? <Skeleton /> : formatCurrency(value, currency)}
    </Typography>
  );
};

ValueHeader.propTypes = {
  ticker: PropTypes.string.isRequired
}

export default ValueHeader;
