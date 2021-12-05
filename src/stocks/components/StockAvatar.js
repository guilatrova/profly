import React from "react";
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';


const StockAvatar = ({ url, ticker, name }) => {
  const ariaLabel = { "aria-label": `logo-${ticker}` };
  if (url) {
    return <Avatar {...ariaLabel} src={url} />;
  }

  const firstLetter = name[0];
  return <Avatar {...ariaLabel}>{firstLetter}</Avatar>;
}


StockAvatar.propTypes = {
  url: PropTypes.string,
  ticker: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default StockAvatar;
