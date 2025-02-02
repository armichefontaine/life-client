import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./Home.css";
import { getCategories } from "../../services/lifeAPI";
import batiente from "../../assets/Categories/batiente.jpg";
import corredera from "../../assets/Categories/corredera.jpg";
import seccional from "../../assets/Categories/seccional.jpg";
import CategoryCard from "../../components/CategoryCard/CategoryCard";

function Home() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function refreshCategories() {
      const categoriesResponse = await getCategories();
      setCategories(categoriesResponse.data);
    }
    refreshCategories();
  }, []);

  console.log(categories)

  const images = {
    batiente,
    corredera,
    seccional
  }

  function getCardCategories() {
    const cards = categories.map(category => {
      const imageUrl = images[category.urlImage];
      console.log(imageUrl)
      return (
        <CategoryCard
          key={category.id}
          title={category.name}
          image={imageUrl}
        />
      );
    });
    return cards;
  }

  return (
    <Box className="home-container">
      <Box>
        <Typography>Elige la categoría del producto:</Typography>
      </Box>
      <Box sx={{display:"flex"}}>
      {getCardCategories()}
      </Box>
    </Box>
  );
}

export default Home;

