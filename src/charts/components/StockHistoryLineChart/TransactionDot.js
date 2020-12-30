/* eslint-disable react/prop-types */
import React from 'react';
import SellIcon from '@material-ui/icons/MoneyOff';
import BuyIcon from '@material-ui/icons/MonetizationOn';
import TradeIcon from '@material-ui/icons/SyncAlt';


const TransactionDot = ({ cx, cy, payload, value }) => {
  if (!value) {
    return null;
  }

  const hasBought = payload.transactions.some(t => t.units > 0);
  const hasSold = payload.transactions.some(t => t.units <= 0);

  if (hasBought && hasSold) {
    return <TradeIcon x={cx - 10} y={cy - 10} width={20} height={20} htmlColor="#3498DB" />;
  }

  if (hasSold) {
    return <SellIcon x={cx - 10} y={cy - 10} width={20} height={20} htmlColor="red" />;
  }

  if (hasBought) {
    return <BuyIcon x={cx - 10} y={cy - 10} width={20} height={20} htmlColor="green" />
  }

  return null;
};

export default TransactionDot;
