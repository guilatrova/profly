import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';


const EmojiSelectPicker = ({ open, emoji, disabled, onEmojiSelect, onPickerStateChange }) => {

  const handleOnSelect = (emoji) => {
    onEmojiSelect(emoji);
    onPickerStateChange();
  };

  if (open) {
    return (
      <ClickAwayListener onClickAway={onPickerStateChange}>
        <Picker
          set="twitter"
          title="How do you feel?"
          emoji={emoji.id}
          style={{ position: 'absolute', zIndex: 99 }}
          onSelect={handleOnSelect}
        />
      </ClickAwayListener>
    );
  }

  return (
    <Button variant="outlined" disabled={disabled} onClick={onPickerStateChange}>
      {emoji.native}
    </Button>
  )
};

EmojiSelectPicker.propTypes = {
  open: PropTypes.bool,
  disabled: PropTypes.bool,

  onPickerStateChange: PropTypes.func.isRequired,
  onEmojiSelect: PropTypes.func.isRequired,

  emoji: PropTypes.shape({
    id: PropTypes.string.isRequired,
    native: PropTypes.string.isRequired
  }).isRequired
};

export default EmojiSelectPicker;
