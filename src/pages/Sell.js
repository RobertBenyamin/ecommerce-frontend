import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Text, Heading, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Sell() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get("/items/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setItems(response);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  const handleDelete = (id) => {
    api
      .delete(`/items/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setItems((prevItems) => prevItems.filter((item) => item.ID !== id));
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  return (
    <Box p={8}>
      <Heading as="h2" size="lg" mb={6} textAlign="center" color="teal.600">
        My Items for Sale
      </Heading>

      {items.length === 0 ? (
        <Text fontSize="lg" textAlign="center" color="gray.500">
          You haven't listed any items yet. Click "Add Item" to get started!
        </Text>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
          {items.map((item) => (
            <Box
              key={item.ID}
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
                {item.Name}
              </Heading>
              <Text fontSize="lg" color="gray.700">
                Price: ${item.Price.toFixed(2)}
              </Text>
              <Text fontSize="sm" color="gray.500" mb={4}>
                {item.Description}
              </Text>
              <Flex justifyContent="space-between" alignItems="center">
                <Button
                  as={Link}
                  to={`/items/${item.ID}/edit`}
                  colorScheme="blue"
                  size="sm"
                  _hover={{ bg: "blue.600" }}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDelete(item.ID)}
                  _hover={{ bg: "red.600" }}
                >
                  Delete
                </Button>
              </Flex>
            </Box>
          ))}
        </Grid>
      )}

      <Button
        as={Link}
        to="/items/create"
        position="fixed"
        bottom="20px"
        right="20px"
        colorScheme="teal"
        size="lg"
        _hover={{ bg: "teal.600" }}
        borderRadius="full"
        boxShadow="xl"
      >
        Add Item
      </Button>
    </Box>
  );
}

export default Sell;
