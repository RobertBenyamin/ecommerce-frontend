import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Text, Heading, Flex } from "@chakra-ui/react";
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
    <Box p={8}>
      <Heading as="h2" size="lg" mb={6} textAlign="center" color="teal.600">
        My Purchases
      </Heading>

      {transactions.length === 0 ? (
        <Text fontSize="lg" textAlign="center" color="gray.500">
          You haven't made any purchases yet. Check back later!
        </Text>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
          {transactions.map((transaction) => (
            <Box
              key={transaction.ID}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="lg"
              p={6}
              bg="white"
              _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
              transition="all 0.2s ease-in-out"
            >
              <Heading as="h3" size="md" mb={2} color="teal.700">
                {transaction.Item.Name}
              </Heading>
              <Text fontSize="lg" color="gray.700">
                Price: ${transaction.Item.Price.toFixed(2)}
              </Text>
              <Text fontSize="sm" color="gray.500" mb={4}>
                {transaction.Item.Description}
              </Text>
              <Flex justifyContent="flex-end">
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDelete(transaction.ID)}
                  _hover={{ bg: "red.600" }}
                >
                  Delete
                </Button>
              </Flex>
            </Box>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default Buy;
