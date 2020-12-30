import React from 'react';
import { useParams } from 'react-router-dom'

const StockPage = ({ match }) => {
  const { ticker } = useParams()

  return (
    <>
      <h1>{ticker}</h1>

    </>
  )
};

export default StockPage;
