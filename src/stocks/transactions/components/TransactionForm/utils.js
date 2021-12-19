import STOCK_ACTIONS from 'stocks/stockActions'

export const prepareEntity = (entity) => {
  const prepared = { ...entity }
  delete prepared.action

  if (entity.action === STOCK_ACTIONS.SELL) {
    prepared.units = -entity.units
  }

  return prepared
}

export const isSubmitEnabled = (entity) => {
  const requiredFields = ['ticker', 'units', 'strikePrice', 'performedAt']
  return requiredFields.reduce((acc, cur) => acc && !!entity[cur], true)
}
