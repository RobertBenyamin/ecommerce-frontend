import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Flex } from "@chakra-ui/react";

function Navbar() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Flex justifyContent="space-between" p="4" bg="teal.500">
      <Box>
        <Link to="/">Home</Link>
      </Box>
      <Box>
        {isAuthenticated ? (
          <>
            <Link to="/sell">Sell</Link>
            <Link to="/buy">Buy</Link>
            <Button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </Box>
    </Flex>
  );
}

export default Navbar;
