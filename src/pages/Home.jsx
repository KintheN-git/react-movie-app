import { Box, Container, Flex, Grid, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getTrendingMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
function Home() {
  const [data, setData] = useState([]);
  const [timeWindow, setTimeWindow] = useState("day");
  useEffect(() => {
    getTrendingMovies("day")
      .then((res) => setData(res))
      .catch((err) => console.log(err, "error"));
  }, []);
  console.log(data, "data");
  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={4} my={10}>
        <Heading as={"h2"} fontSize={"md"} textTransform={"uppercase"}>
          Trending
        </Heading>
        <Flex
          gap={2}
          alignItems={"center"}
          border={"1px solid teal"}
          borderRadius={"20px"}
        >
          <Box as={"button"} py={1} px={3} borderRadius={"20px"}>
            Today
          </Box>
          <Box as={"button"} py={1} px={3} borderRadius={"20px"}>
            This Week
          </Box>
        </Flex>
      </Flex>

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={4}
      >
        {data && data?.map((item) => <MovieCard item={item} key={item.id} />)}
      </Grid>
    </Container>
  );
}

export default Home;
