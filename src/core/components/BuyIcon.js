import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';


const STROKE_COLOR = '#FFF';
const STROKE_WIDTH = 2;

const useStyles = makeStyles((theme) => ({
  iconStyle: {
    color: theme.palette.success.main,
    transform: "scaleX(-1)",
  },
}));


const BuyIcon = ({ size='large' }) => {
  const classes = useStyles();

  return (
    <SvgIcon className={classes.iconStyle} fontSize={size}>
      <path
        d="M20 5.41L18.59 4 7 15.59V9H5v10h10v-2H8.41z"
        stroke={STROKE_COLOR}
        strokeWidth={STROKE_WIDTH}
      />
      <path d="M20 5.41L18.59 4 7 15.59V9H5v10h10v-2H8.41z"/>
    </SvgIcon>
  )
};

BuyIcon.propTypes = {
  size: PropTypes.oneOf(['large', 'small'])
};

export default BuyIcon;
