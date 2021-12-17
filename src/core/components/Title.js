import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

function Title(props) {
  return (
    <Typography gutterBottom color="primary" component="h2" variant="h6">
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
