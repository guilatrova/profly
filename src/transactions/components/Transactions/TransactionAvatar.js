import React from 'react';
import PropTypes from 'prop-types';

import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';

import BuyIcon from '../../../core/components/BuyIcon';
import Emoji from '../../../core/components/Emoji';
import SellIcon from '../../../core/components/SellIcon';
import StockAvatar from '../../../stocks/components/StockAvatar';
import { transactionPropType } from '../../types';


const useStyles = makeStyles({
  root: {
    marginRight: 15
  }
});


const TransactionAvatar = ({ item }) => {
  const classes = useStyles();
  const Icon = item.units >= 0 ? BuyIcon : SellIcon;
  const { stock } = item;

  return (
    <div className={classes.root}>
      <Badge
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        badgeContent={<Icon />}
        >
        <Badge
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          badgeContent={<Emoji emoji={item.emotion} />}
        >
          <StockAvatar
            name={stock.name}
            ticker={stock.ticker}
            url={stock.logoUrl}
          />
        </Badge>
      </Badge>
    </div>
  );
}


TransactionAvatar.propTypes = {
  displayStock: PropTypes.bool,
  item: transactionPropType.isRequired,
};

export default TransactionAvatar;
