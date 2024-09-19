import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  Button,
  Input,
  Textarea,
  Box,
  VStack,
  Heading,
  Flex,
  Text,
} from "@chakra-ui/react";

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

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
        setError("Error fetching item data.");
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
      if (response.error) {
        setError(response.error);
      } else {
        console.log("Item updated:", response);
        navigate("/sell");
      }
    } catch (error) {
      console.error("Error updating item:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="gray.50"
    >
      <Box
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        width={{ base: "90%", sm: "400px" }}
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <Heading as="h2" size="lg" textAlign="center" color="teal.600">
              Edit Item
            </Heading>

            <Input
              placeholder="Item Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="lg"
              borderColor="teal.400"
              focusBorderColor="teal.600"
              _hover={{ borderColor: "teal.500" }}
            />
            <Input
              type="number"
              placeholder="Item Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              size="lg"
              borderColor="teal.400"
              focusBorderColor="teal.600"
              _hover={{ borderColor: "teal.500" }}
            />
            <Textarea
              placeholder="Item Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              size="lg"
              borderColor="teal.400"
              focusBorderColor="teal.600"
              _hover={{ borderColor: "teal.500" }}
            />

            {error && (
              <Text
                color="red.500"
                textAlign="center"
                size="lg"
                fontWeight="semibold"
              >
                {error}
              </Text>
            )}

            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              width="100%"
              _hover={{ bg: "teal.600" }}
            >
              Update Item
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default EditItem;
