import React from 'react';
import queries from "./queries";
import { useQuery } from "@apollo/client";



const Stocks = () => {
  const { loading, error, data } = useQuery(queries.listStocks);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error <pre>{error}</pre></p>;

  return (
    <div>
      <h1>Stocks</h1>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
};

export default Stocks;
