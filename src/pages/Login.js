import React, { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post("/login", { email, password });
    localStorage.setItem("token", response.token);
    window.location.href = "/";
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </form>
    </Box>
  );
}

export default Login;
