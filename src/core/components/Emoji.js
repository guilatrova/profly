import React from 'react';
import { Emoji } from 'emoji-mart'
import PropTypes from 'prop-types';


const EmojiWrapper = ({ emoji='neutral_face', size=24 }) => {
  return (
    <Emoji emoji={emoji} size={size} set="twitter" />
  )
}

EmojiWrapper.propTypes = {
  size: PropTypes.number,
  emoji: PropTypes.string,
}

export default EmojiWrapper;
