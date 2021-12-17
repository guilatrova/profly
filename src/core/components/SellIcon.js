import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';


const STROKE_COLOR = '#FFF';
const STROKE_WIDTH = 2;

const useStyles = makeStyles((theme) => ({
  iconStyle: {
    color: theme.palette.error.main,
    transform: "scaleX(-1)",
  },
}));


const SellIcon = ({ size='large' }) => {
  const classes = useStyles();

  return (
    <SvgIcon className={classes.iconStyle} fontSize={size}>
      <path
        d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z"
        stroke={STROKE_COLOR}
        strokeWidth={STROKE_WIDTH}
      />
      <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z" />
    </SvgIcon>
  )
};

SellIcon.propTypes = {
  size: PropTypes.oneOf(['large', 'small'])
};

export default SellIcon;
