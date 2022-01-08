import ACTIONS from 'savings/savingsActions'

export const prepareEntity = (entity) => {
  const prepared = { ...entity }
  delete prepared.action

  if (entity.action === ACTIONS.WITHDRAWAL) {
    prepared.value = -entity.value
  }

  if (entity.notes === '') {
    entity.notes = null
  }

  return prepared
}

export const isSubmitEnabled = (entity) => {
  const requiredFields = ['value', 'performedAt']
  return requiredFields.reduce((acc, cur) => acc && !!entity[cur], true)
}
