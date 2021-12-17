import React from "react";

import { useMutation } from "@apollo/client";

import TransactionForm from "../components/TransactionForm";
import queries from "../queries";

const Container = ({ onPostSubmit }) => {
  const [addTransaction, addTransactionResponse] = useMutation(queries.addTransaction)
  const onSubmit = entity => {
    addTransaction({ variables: { entity }});
    if (onPostSubmit) {
      onPostSubmit();
    }
  }

  return (
    <>
      <TransactionForm onSubmit={onSubmit} />
      <pre>
        {JSON.stringify(addTransactionResponse.data)}
      </pre>
    </>
  )
}

export default Container;
