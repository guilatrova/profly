/* eslint-disable react/prop-types */
import React from 'react';
import { formatShortTimeOutput } from '../../../utils/dates';
import { formatCurrency } from '../../../utils/money';


// TODO: Use i18n
const TransactionEventEntry = ({ transaction: t }) => {
  const atTime = formatShortTimeOutput(t.performedAt);
  const value = formatCurrency(t.value);
  let eventDesc = "bought";
  let units = t.units;
  if (t.units <= 0) {
    eventDesc = "sold";
    units = -t.units;
  }

  return (
    <p>You {eventDesc} {units} units at {atTime} ({value})</p>
  )
};

export default TransactionEventEntry;
