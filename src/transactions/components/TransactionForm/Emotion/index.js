import React, { useState } from 'react';
import FormLabel from '@material-ui/core/FormLabel';

import EmojiSelectPicker from './EmojiSelectPicker'

const INITIAL_EMOJI = {
  id: 'neutral_face',
  native: '😐'
};

const Emotion = () => {
  const [selectedEmoji, setEmoji] = useState(INITIAL_EMOJI);
  const [isPickerOpen, setPickerOpen] = useState(false);

  const handlePickerState = () => setPickerOpen(!isPickerOpen);
  const handleOnSelect = emoji => setEmoji(emoji);

  return (
    <div>
      <FormLabel>Emoji</FormLabel>
      <br />

      <EmojiSelectPicker
        open={isPickerOpen}
        emoji={selectedEmoji}
        onPickerStateChange={handlePickerState}
        onEmojiSelect={handleOnSelect}
      />
    </div>
  );
};

export default Emotion;
