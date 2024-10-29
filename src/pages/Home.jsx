import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Skeleton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getTrending } from "../services/api";
import MovieCard from "../components/MovieCard";
function Home() {
  const [data, setData] = useState([]);
  const [timeWindow, setTimeWindow] = useState("day");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    getTrending(timeWindow)
      .then((res) => setData(res))
      .catch((err) => console.log(err, "error"))
      .finally(() => setIsLoading(false));
  }, [timeWindow]);

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
          <Box
            as={"button"}
            py={1}
            px={3}
            borderRadius={"20px"}
            onClick={() => setTimeWindow("day")}
            bg={timeWindow === "day" ? "gray.800" : "transparent"}
            transition={"all 0.5s ease-in-out"}
          >
            Today
          </Box>
          <Box
            as={"button"}
            py={1}
            px={3}
            borderRadius={"20px"}
            onClick={() => setTimeWindow("week")}
            bg={timeWindow === "week" ? "gray.800" : "transparent"}
            transition={"all 0.5s ease-in-out"}
          >
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
        {data &&
          data.map((item, index) =>
            isLoading ? (
              <Skeleton key={index} height={"350px"} />
            ) : (
              <MovieCard key={index} item={item} mediaType={item.media_type} />
            )
          )}
      </Grid>
    </Container>
  );
}

export default Home;
