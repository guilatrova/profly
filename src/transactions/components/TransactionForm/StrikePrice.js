import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { useQuery } from '@apollo/client';
import queries from '../../queries';


// TODO: Implement i18n
const StrikePrice = ({ ticker, value, onPriceChange }) => {
  const [price, setPrice] = useState(value);
  const { loading, data } = useQuery(queries.getStockInfo, { variables: {ticker} });
  const handleChange = value => {
    setPrice(value);
    onPriceChange(value);
  };

  useEffect(() => {
    if (!loading && !value) {
      const initialValue = data.stockCurrentInfo?.currentPrice;
      if (initialValue && !price) {
        handleChange(initialValue);
      }
    }
  }, [loading, data, value, price, handleChange]);

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
      <TextField id="strikePrice" label="Strike Price" value={price} onChange={e => handleChange(e.target.value)} />
  );
}

StrikePrice.propTypes = {
  ticker: PropTypes.string,
  value: PropTypes.string,
  onPriceChange: PropTypes.func.isRequired
}

export default StrikePrice;
