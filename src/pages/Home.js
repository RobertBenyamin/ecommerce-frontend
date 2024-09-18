import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@chakra-ui/react";
import api from "../services/api";
import ItemCard from "../components/ItemCard";

function Home() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/items/").then((response) => {
      setItems(response);
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
        });
    }
  };

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
      {items.map((item) => (
        <ItemCard item={item} onBuyClick={handleBuy} />
      ))}
    </Grid>
  );
}

export default Home;
