import React from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";

function ItemCard({ item, onBuyClick }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6">
      <Image
        src={`https://via.placeholder.com/150?text=${item.Name}`}
        alt={item.Name}
      />

      <Box mt="2">
        <Text fontSize="xl" fontWeight="semibold">
          {item.Name}
        </Text>
        <Text mt="1" fontSize="sm">
          {item.Description}
        </Text>
        <Text mt="2" fontWeight="bold">
          ${item.Price}
        </Text>
      </Box>

      <Box mt="4">
        {onBuyClick && (
          <Button onClick={() => onBuyClick(item.ID)} colorScheme="blue">
            Beli
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default ItemCard;
