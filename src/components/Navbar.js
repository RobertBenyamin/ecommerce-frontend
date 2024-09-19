import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Flex, HStack, IconButton } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = !!localStorage.getItem("token");
  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <Flex
      as="nav"
      justifyContent="space-between"
      p="4"
      bg="teal.600"
      color="white"
      alignItems="center"
    >
      <Box>
        <Link to="/" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          Home
        </Link>
      </Box>

      <IconButton
        display={{ base: "block", md: "none" }}
        onClick={handleToggle}
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        variant="outline"
        colorScheme="white"
        aria-label="Toggle Navigation"
      />

      <HStack
        as="nav"
        spacing="8"
        display={{ base: isOpen ? "flex" : "none", md: "flex" }}
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
        position={{ base: "absolute", md: "relative" }}
        top={{ base: "60px", md: "0" }}
        left={{ base: "0", md: "unset" }}
        right={{ base: "0", md: "unset" }}
        bg={{ base: "teal.600", md: "unset" }}
        py={{ base: 4, md: 0 }}
      >
        {isAuthenticated ? (
          <>
            <Link to="/sell" className="nav-link">
              Sell
            </Link>
            <Link to="/buy" className="nav-link">
              Buy
            </Link>
            <Button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
              bg="red.500"
              textColor={"white"}
              _hover={{ bg: "red.600" }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </HStack>
    </Flex>
  );
}

export default Navbar;
