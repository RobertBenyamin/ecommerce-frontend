import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Flex,
  Text,
} from "@chakra-ui/react";
import api from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/register", { name, email, password });

      if (!response.token) {
        setError(response.error); 
      } else {
        localStorage.setItem("token", response.token);
        window.location.href = "/";
      }
    } catch (error) {
      setError("An error occurred during registration. Please try again."); 
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
              Register
            </Heading>

            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="lg"
              borderColor="teal.400"
              focusBorderColor="teal.600"
              _hover={{ borderColor: "teal.500" }}
            />
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="lg"
              borderColor="teal.400"
              focusBorderColor="teal.600"
              _hover={{ borderColor: "teal.500" }}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              Register
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}

export default Register;
