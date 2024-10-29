import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { imageUrl } from "../services/api";
import { Link } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";

const MovieCard = ({ item, mediaType }) => {
  return (
    <Link to={`/${mediaType}/${item.id}`} className="group">
      <Box
        borderColor={"gray.800"}
        borderWidth={"1px"}
        height={"100%"}
        position={"relative"}
        transform={"scale(1)"}
        transition={"transform 0.3s ease-in-out"}
        _hover={{
          cursor: "pointer",
          transform: { base: "scale(1)", md: "scale(1.08)" },
          "& .overlay": {
            height: "33%",
            opacity: 1,
            transition: "height 0.3s ease-in-out, opacity 0.3s ease-in-out",
          },
        }}
      >
        <Image
          src={
            item.poster_path
              ? `${imageUrl}/${item.poster_path}`
              : "/src/assets/poster-not-found.png"
          }
          alt={item.title || item.name}
          height={"100%"}
        />
        <Box
          className="overlay"
          position={"absolute"}
          w={"100%"}
          h={"0%"}
          p={2}
          bottom={0}
          left={0}
          bg={"rgba(0,0,0,0.9)"}
          opacity={0}
          transition={"height 0.3s ease-in-out, opacity 0.3s ease-in-out"}
        >
          <Text textAlign={"center"} color={"whiteAlpha.900"}>
            {item.title || item.name}
          </Text>
          <Text textAlign={"center"} color={"green.200"} fontSize={"x-small"}>
            {new Date(item.release_date || item.first_air_date).getFullYear() ||
              "N/A"}
          </Text>
          <Flex alignItems={"center"} justifyContent={"center"} gap={2} mt={4}>
            <StarIcon fontSize={"small"} />
            <Text>{item?.vote_average?.toFixed(1)}</Text>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
};

export default MovieCard;
