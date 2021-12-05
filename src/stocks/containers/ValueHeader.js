import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import queries from '../queries';
import ErrorHandler from '../../core/components/ApolloErrorHandler';
import Typography from '@material-ui/core/Typography';
import { formatCurrency } from '../../utils/money';
import Skeleton from '@material-ui/lab/Skeleton';


const ValueHeader = ({ ticker }) => {
  const { loading, error, data } = useQuery(queries.stockSummary, { variables: { ticker }});

  if (error) return <ErrorHandler>{error}</ErrorHandler>;

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
