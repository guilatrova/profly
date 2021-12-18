import 'emoji-mart/css/emoji-mart.css'

import React from 'react'
import PropTypes from 'prop-types'

import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'

import clsx from 'clsx'
import Emoji from 'common/components/emoji'
import { Picker } from 'emoji-mart'

const useStyles = makeStyles({
  disabled: {
    opacity: 0.5,
  },
  emojiButton: {
    margin: 'auto',
  },
})

const EmojiSelectPicker = ({
  disabled,
  emoji,
  onEmojiSelect,
  onPickerStateChange,
  open,
}) => {
  const classes = useStyles()

  const handleOnSelect = (emoji) => {
    onEmojiSelect(emoji)
    onPickerStateChange()
  }

  return (
    <>
      <IconButton
        className={clsx(classes.emojiButton, { [classes.disabled]: disabled })}
        disabled={disabled}
        onClick={onPickerStateChange}
      >
        <Emoji emoji={emoji} size={32} />
      </IconButton>

      {open && (
        <ClickAwayListener onClickAway={onPickerStateChange}>
          <div style={{ position: 'relative' }}>
            <Picker
              emoji={emoji.id}
              set="twitter"
              style={{ bottom: 0, position: 'absolute', zIndex: 999 }}
              title="How do you feel?"
              onSelect={handleOnSelect}
            />
          </div>
        </ClickAwayListener>
      )}
    </>
  )
}

EmojiSelectPicker.propTypes = {
  disabled: PropTypes.bool,
  emoji: PropTypes.shape({
    id: PropTypes.string.isRequired,
    native: PropTypes.string.isRequired,
  }).isRequired,

  onEmojiSelect: PropTypes.func.isRequired,
  onPickerStateChange: PropTypes.func.isRequired,

  open: PropTypes.bool,
}

export default EmojiSelectPicker
