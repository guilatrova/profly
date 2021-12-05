import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';


const STROKE_COLOR = '#FFF';
const STROKE_WIDTH = 2;

const useStyles = makeStyles((theme) => ({
  iconStyle: {
    transform: "scaleX(-1)",
    color: theme.palette.success.main,
  },
}));


const BuyIcon = ({ size='large' }) => {
  const classes = useStyles();

  return (
    <SvgIcon fontSize={size} className={classes.iconStyle}>
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
