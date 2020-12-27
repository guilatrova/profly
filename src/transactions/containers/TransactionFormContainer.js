import React from "react";
import TransactionForm from "../components/TransactionForm";
import queries from "../queries";
import { useMutation } from "@apollo/client";

const Container = () => {
  const [addTransaction, addTransactionResponse] = useMutation(queries.addTransaction)
  const onSubmit = entity => addTransaction({ variables: { entity }});

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
