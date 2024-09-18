import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Sell from "./pages/Sell";
import Buy from "./pages/Buy";
import CreateItem from "./pages/CreateItem";
import EditItem from "./pages/EditItem";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sell" element={<ProtectedRoute component={Sell} />} />
        <Route path="/buy" element={<ProtectedRoute component={Buy} />} />
        <Route
          path="/items/create"
          element={<ProtectedRoute component={CreateItem} />}
        />
        <Route
          path="/items/:id/edit"
          element={<ProtectedRoute component={EditItem} />}
        />
      </Routes>
    </>
  );
}

export default App;
