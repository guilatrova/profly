import React, { useState } from 'react';
import PropTypes from 'prop-types';

import EmojiSelectPicker from './EmojiSelectPicker'

const INITIAL_EMOJI = {
  id: 'neutral_face',
  native: '😐'
};

const Emotion = ({ disabled, onChange }) => {
  const [selectedEmoji, setEmoji] = useState(INITIAL_EMOJI);
  const [isPickerOpen, setPickerOpen] = useState(false);

  const handlePickerState = () => setPickerOpen(!isPickerOpen);
  const handleOnSelect = emoji => {
    setEmoji(emoji);
    onChange(emoji);
  }

  return (
    <EmojiSelectPicker
      disabled={disabled}
      emoji={selectedEmoji}
      open={isPickerOpen}
      onEmojiSelect={handleOnSelect}
      onPickerStateChange={handlePickerState}
    />
  );
};

Emotion.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired
}

export default Emotion;
