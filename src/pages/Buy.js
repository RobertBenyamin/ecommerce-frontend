import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@chakra-ui/react";
import api from "../services/api";

function Buy() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    api
      .get("/transactions/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setTransactions(response);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  const handleDelete = (id) => {
    api
      .delete(`/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setTransactions((prevTransactions) =>
          prevTransactions.filter((transaction) => transaction.ID !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting transaction:", error);
      });
  };

  return (
    <Box>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {transactions.map((transaction) => (
          <Box key={transaction.ID} borderWidth="1px" borderRadius="lg" p="6">
            <h3>{transaction.Item.Name}</h3>
            <Button onClick={() => handleDelete(transaction.ID)}>Delete</Button>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

export default Buy;
