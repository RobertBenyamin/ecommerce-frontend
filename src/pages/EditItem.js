import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { Button, Input, Textarea, Box, VStack } from "@chakra-ui/react";

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    api
      .get(`/items/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setName(response.Name);
        setPrice(response.Price);
        setDescription(response.Description);
      })
      .catch((error) => {
        console.error("Error fetching item data:", error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(
        `/items/${id}`,
        { name, price: parseFloat(price), description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Item updated:", response);
      navigate("/sell");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <Input
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Item Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Textarea
          placeholder="Item Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleSubmit}>
          Update Item
        </Button>
      </VStack>
    </Box>
  );
};

export default EditItem;
