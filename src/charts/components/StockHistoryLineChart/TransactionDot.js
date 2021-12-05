/* eslint-disable react/prop-types */
import React from 'react';


const TransactionDot = ({ cx, cy, payload, value }) => {
  if (!value) {
    return null;
  }

  const hasBought = payload.transactions.some(t => t.units > 0);
  const hasSold = payload.transactions.some(t => t.units <= 0);

  if (hasBought && hasSold) {
    return <circle cx={cx} cy={cy} r={5} stroke="#fff" strokeWidth={2} fill="black" />;
  }

  if (hasSold) {
    return <circle cx={cx} cy={cy} r={5} stroke="#fff" strokeWidth={2} fill="rgb(244, 67, 54)" />;
  }

  if (hasBought) {
    return <circle cx={cx} cy={cy} r={5} stroke="#fff" strokeWidth={2} fill="rgb(76, 175, 80)" />
  }

  return null;
};

export default TransactionDot;
