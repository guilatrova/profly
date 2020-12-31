import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import StrikeActionToggle from './StrikeActionToggle';


// TODO: Implement i18n
const TransactionBody = ({ stockInfo, loading }) => {
  const isDisabled = !stockInfo || loading;
  const [units, setUnits] = useState("");
  const [price, setPrice] = useState("");
  const [userInput, setUserInput] = useState(false);
  const [, setStrikeAction] = useState();

  if (!userInput && stockInfo?.currentPrice && price !== stockInfo?.currentPrice) {
    setPrice(stockInfo.currentPrice);
  }

  const handleChange = setter => e => setter(e.target.value);
  const handleActionChange = action => setStrikeAction(action);

  return (
    <>
      <p>{stockInfo?.name}</p>

      <StrikeActionToggle disabled={isDisabled} onChange={handleActionChange} />

      <TextField disabled={isDisabled} id="units" label="Units" value={units} onChange={handleChange(setUnits)} />

      <TextField disabled={isDisabled} id="strikePrice" label="Strike Price" value={price} onChange={handleChange(setPrice)} onKeyDown={() => setUserInput(true)} />
    </>
  );
}

TransactionBody.propTypes = {
  stockInfo: PropTypes.shape({}),
  loading: PropTypes.bool
}

export default TransactionBody;
