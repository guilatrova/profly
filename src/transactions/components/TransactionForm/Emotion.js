import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

const INITIAL_EMOJI = {
  id: 'neutral_face',
  native: '😐'
}

const Emotion = () => {
  const [selectedEmoji, setEmoji] = useState(INITIAL_EMOJI);
  const [isPickerOpen, setPickerOpen] = useState(false);

  const handlePickerOpen = () => setPickerOpen(!isPickerOpen);
  const handleOnSelect = (emoji) => {
    setEmoji(emoji);
    handlePickerOpen();
  };

  if (isPickerOpen) {
    return (
      <ClickAwayListener onClickAway={handlePickerOpen}>
        <Picker
          set="twitter"
          title="How do you feel?"
          emoji={INITIAL_EMOJI.id}
          style={{ position: 'relative' }}
          onSelect={handleOnSelect}
        />
      </ClickAwayListener>
    )
  }

  return (
    <Button variant="outlined" onClick={handlePickerOpen}>
      {selectedEmoji.native}
    </Button>
  )
}

export default Emotion;
