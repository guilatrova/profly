import React from 'react';
import { useQuery } from '@apollo/client';
import chartQueries from '../../charts/queries';
import savingsQueries from '../queries';
import ErrorHandler from '../../core/components/ApolloErrorHandler';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { formatCurrency } from '../../utils/money';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { Box } from '@material-ui/core';
import BitcoinIcon from '../../assets/bitcoin.svg';
import WalletIcon from '../../assets/wallet.svg';
import StocksIcon from '../../assets/stocks.svg';

const useStyles = makeStyles((theme) => ({
  summaryTitle: {
    flexBasis: '25%',
  },
  summaryValue: {
    fontWeight: '700',
    flexShrink: 0,
  },
  card: {
    width: 160,
    marginRight: theme.spacing(2)
  },
  media: {
    height: 100,
    textAlign: 'center',
  },
  mediaImage: {
    width: 90,
    paddingTop: 20,
    margin: 'auto'
  },
  soonChip: {
    fontWeight: 'bold',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
}));

const CategorySummaryCard = ({ src, title, disabled, children, redirect="" }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Link to={redirect} className={classes.link} disabled={disabled}>
        <CardActionArea disabled={disabled}>
          <CardMedia
            className={classes.media}
            title={title}
          >
            <img src={src} className={classes.mediaImage} />
          </CardMedia>

          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {children}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

const SavingsSummary = () => {
  const classes = useStyles();
  const { error, data = [] } = useQuery(chartQueries.chartStocksValues);
  const { walletError, walletData } = useQuery(savingsQueries.defaultWallet);
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  if (error)
    return <ErrorHandler operation="portfolio summary">{error}</ErrorHandler>;
  if (walletError)
    return (
      <ErrorHandler operation="wallet summary">{walletError}</ErrorHandler>
    );

  const chartData = data?.stocks || [];
  const walletTotal = walletData?.value || 0;
  // TODO: Consider different currencies
  const stocksTotal = chartData.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <Box display="flex" justifyContent="center">
      <CategorySummaryCard src={WalletIcon} title="Savings">
        {formatCurrency(walletTotal)}
      </CategorySummaryCard>

      <CategorySummaryCard src={StocksIcon} title="Stocks" redirect="/stocks">
        {formatCurrency(stocksTotal)}
      </CategorySummaryCard>

      <CategorySummaryCard src={BitcoinIcon} title="Crypto" disabled>
        <Chip size="small" label="coming soon" color="secondary" className={classes.soonChip} />
      </CategorySummaryCard>
    </Box>
  );
};

export default SavingsSummary;
