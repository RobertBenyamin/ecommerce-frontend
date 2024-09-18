import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Button, Input, Textarea, Box, VStack } from "@chakra-ui/react";

const CreateItem = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/items/",
        { name, price: parseFloat(price), description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Item created:", response);
      navigate("/sell"); 
    } catch (error) {
      console.error("Error creating item:", error);
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
          Create Item
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateItem;
