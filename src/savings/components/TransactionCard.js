// import React from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import { formatCurrency } from '../../utils/money';
// import Actions from '../../transactions/components/Transactions/Actions';
// import { useMutation } from '@apollo/client';
// import queries from '../../queries';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import Typography from '@material-ui/core/Typography';
// import clsx from 'clsx'
// import TransactionAvatar from './TransactionAvatar';
// import { useSnackbar } from 'notistack';


// const useStyles = makeStyles({
//   headerTitle: {
//     fontWeight: 900,
//     fontSize: 16
//   },
//   card: {
//     cursor: 'pointer',
//     background: 'inherit',
//     position: 'relative',
//     padding: '10px 0',
//     '&:hover': {
//       background: '#eaeaea'
//     },
//     '&:before': {
//       content: '""',
//       display: 'block',
//       position: 'absolute',
//       left: '70px',
//       right: '28px',
//       bottom: 0,
//       borderBottom: '1px solid #dadada',
//     }
//   },
//   cardHeader: {
//     paddingLeft: 5
//   },
//   cardAvatar: {
//     marginRight: 15
//   }
// });


// const TransactionCard = ({ row }) => {
//   const classes = useStyles();
//   const { enqueueSnackbar } = useSnackbar();

//   // const [deleteMutation] = useMutation(queries.deleteTransaction, { variables: { id: row.id }});
//   const handleDelete = () => {
//     // deleteMutation();
//     enqueueSnackbar("Transaction deleted successfully", { variant: 'success' });
//     // setTimeout(() => window.location.reload(false), 2000);
//   };
//   const title = "Deposit" || "Withdrawal";

//   return (
//     <Card elevation={0} className={classes.card}>
//       <CardHeader
//         className={classes.cardHeader}
//         // avatar={
//         //   <TransactionAvatar item={row} />
//         // }
//         title={<Typography className={classes.headerTitle}>{title}</Typography>}
//         subheader={row.notes}
//         action={
//           <div>
//             <span className={clsx(classes.headerTitle)}>{formatCurrency(row.value, row.wallet.currency)}</span>
//             <Actions onDelete={handleDelete} />
//           </div>
//         }
//       />
//     </Card>
//   );
// };

// TransactionCard.propTypes = {
//   row: PropTypes.any,
//   mode: PropTypes.oneOf(['ALL', 'STOCK']),
// };

// export default TransactionCard;
