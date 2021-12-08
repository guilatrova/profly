import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import 'emoji-mart/css/emoji-mart.css';
import { Emoji as EmojiDisplay, Picker } from 'emoji-mart';

const useStyles = makeStyles({
  emojiButton: {
    margin: 'auto'
  },
  disabled: {
    opacity: 0.5
  }
});

const EmojiSelectPicker = ({ open, emoji, disabled, onEmojiSelect, onPickerStateChange }) => {
  const classes = useStyles();

  const handleOnSelect = (emoji) => {
    onEmojiSelect(emoji);
    onPickerStateChange();
  };

  return (
    <>
      <IconButton
        className={clsx(classes.emojiButton, {[classes.disabled]: disabled})}
        disabled={disabled}
        onClick={onPickerStateChange}
      >
        <EmojiDisplay emoji={emoji} set="twitter" size={32} />
      </IconButton>

      {open && <ClickAwayListener onClickAway={onPickerStateChange}>
        <div style={{position: 'relative'}}>
          <Picker
            set="twitter"
            title="How do you feel?"
            emoji={emoji.id}
            style={{ position: 'absolute', zIndex: 999, bottom: 0 }}
            onSelect={handleOnSelect}
          />
        </div>
      </ClickAwayListener>}
    </>
  );
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
