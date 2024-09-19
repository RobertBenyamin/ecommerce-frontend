import React, { useEffect, useState } from "react";
import { Grid, Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Home() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/items/")
      .then((response) => {
        setItems(response);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  const handleBuy = (id) => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      api
        .post(
          "/transactions/",
          { item_ids: [id] },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          navigate("/buy");
        })
        .catch((error) => {
          console.error("Error creating transaction:", error);
        });
    }
  };

  return (
    <Box p={8}>
      <Heading as="h2" size="lg" mb={6} textAlign="center" color="teal.600">
        Available Items
      </Heading>

      {items.length > 0 ? (
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
              <Button
                colorScheme="teal"
                size="sm"
                onClick={() => handleBuy(item.ID)}
                _hover={{ bg: "teal.600" }}
                width="full"
              >
                Buy Now
              </Button>
            </Box>
          ))}
        </Grid>
      ) : (
        <Text fontSize="lg" textAlign="center" color="gray.500">
          No items available for purchase at the moment.
        </Text>
      )}
    </Box>
  );
}

export default Home;
