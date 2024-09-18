import React, { useState, useEffect } from "react";
import { Box, Button, Grid } from "@chakra-ui/react";
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
      });
  }, []); // Empty dependency array ensures this runs once on mount

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
    <Box>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {items.map((item) => (
          <Box key={item.ID} borderWidth="1px" borderRadius="lg" p="6">
            <h3>{item.Name}</h3>
            <Link to={`/items/${item.ID}/edit`}>Edit</Link>
            <Button onClick={() => handleDelete(item.ID)}>Delete</Button>
          </Box>
        ))}
      </Grid>
      <Button
        as={Link}
        to="/items/create"
        position="fixed"
        bottom="20px"
        right="20px"
        colorScheme="teal"
      >
        Tambah Item
      </Button>
    </Box>
  );
}

export default Sell;
