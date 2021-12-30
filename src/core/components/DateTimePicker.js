import React from 'react'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import { DateTimePicker, KeyboardDateTimePicker } from '@material-ui/pickers'

import { getLocaleDateFormatString } from 'utils/dates'

const ProflyDateTimePicker = (props) => {
  const matches = useMediaQuery('(min-width:800px)')
  const PickerElement = matches ? KeyboardDateTimePicker : DateTimePicker
  const dateFormat = getLocaleDateFormatString()

  return (
    <PickerElement
      autoOk
      disableFuture
      ampm={false}
      format={`${dateFormat} HH:mm`}
      variant="inline"
      views={['year', 'month', 'date', 'hours', 'minutes']}
      {...props}
    />
  )
}

export default ProflyDateTimePicker
