import React from "react";

import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';


const StockAvatar = ({ name, ticker, url }) => {
  const ariaLabel = { "aria-label": `logo-${ticker}` };
  if (url) {
    return <Avatar {...ariaLabel} src={url} />;
  }

  const firstLetter = name[0];
  return <Avatar {...ariaLabel}>{firstLetter}</Avatar>;
}


StockAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  ticker: PropTypes.string.isRequired,
  url: PropTypes.string,
};

export default StockAvatar;
