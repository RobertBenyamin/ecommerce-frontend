import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const CreateItem = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
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

      if (response.error) {
        setError(response.error);
      } else {
        console.log("Item created:", response);
        navigate("/sell");
      }
    } catch (error) {
      console.error("Error creating item:", error);
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
              Create Item
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
              Create Item
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default CreateItem;
