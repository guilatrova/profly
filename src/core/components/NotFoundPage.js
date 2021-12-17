import React from 'react'
import { Link } from 'react-router-dom'

import paths from 'routes/paths'

const NotFoundPage = () => {
  return (
    <div>
      <h4>404 Page Not Found</h4>
      <Link to={paths.MAIN}> Go back to homepage </Link>
    </div>
  )
}

export default NotFoundPage
