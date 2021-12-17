import React from 'react';

import { Emoji } from 'emoji-mart'
import PropTypes from 'prop-types';


const EmojiWrapper = ({ emoji='neutral_face', size=24 }) => {
  return (
    <Emoji emoji={emoji} set="twitter" size={size} />
  )
}

EmojiWrapper.propTypes = {
  emoji: PropTypes.string,
  size: PropTypes.number,
}

export default EmojiWrapper;
