import STOCK_ACTIONS from '../../../core/constants/stockActions';


export const prepareEntity = (entity) => {
  const prepared = {...entity};
  delete prepared.action;

  if (entity.action === STOCK_ACTIONS.SELL) {
    prepared.units = -entity.units;
  }

  return prepared;
};
