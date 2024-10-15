import { Box, Image } from "@chakra-ui/react";
import React from "react";
import { imageUrl } from "../services/api";

const MovieCard = ({ item }) => {
  return (
    <Box>
      <Image src={`${imageUrl}/${item.poster_path}`} alt={item.title} />
    </Box>
  );
};

export default MovieCard;
