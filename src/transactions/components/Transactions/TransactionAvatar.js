import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { transactionPropType } from '../../types';
import Badge from '@material-ui/core/Badge';
import StockAvatar from '../../../stocks/components/StockAvatar';
import SellIcon from '../../../core/components/SellIcon';
import BuyIcon from '../../../core/components/BuyIcon';
import Emoji from '../../../core/components/Emoji';


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
        badgeContent={<Icon />}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        >
        <Badge
          badgeContent={<Emoji emoji={item.emotion} />}
          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        >
          <StockAvatar
            url={stock.logoUrl}
            ticker={stock.ticker}
            name={stock.name}
          />
        </Badge>
      </Badge>
    </div>
  );
}


TransactionAvatar.propTypes = {
  item: transactionPropType.isRequired,
  displayStock: PropTypes.bool,
};

export default TransactionAvatar;
