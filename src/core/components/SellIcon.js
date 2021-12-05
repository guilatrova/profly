import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';


const STROKE_COLOR = '#FFF';
const STROKE_WIDTH = 2;

const useStyles = makeStyles((theme) => ({
  iconStyle: {
    transform: "scaleX(-1)",
    color: theme.palette.error.main,
  },
}));


const SellIcon = ({ size='large' }) => {
  const classes = useStyles();

  return (
    <SvgIcon fontSize={size} className={classes.iconStyle}>
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
