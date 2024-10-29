import {
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  Skeleton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getDiscoverMovies } from "../../services/api";
import MovieCard from "../../components/MovieCard";

import PaginationComponent from "../../components/PaginationComponent";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [sortValue, setSortValue] = useState("popularity.desc");
  useEffect(() => {
    setIsLoading(true);
    getDiscoverMovies(activePage, sortValue)
      .then((res) => {
        setActivePage(res?.page);
        setMovies(res?.results);
        setTotalPages(res?.total_pages);
      })
      .catch((err) => console.log(err, "error"))
      .finally(() => {
        setIsLoading(false);
      });
  }, [activePage, sortValue]);

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={4}>
        <Heading as={"h2"} fontSize={"md"} textTransform={"uppercase"} my={10}>
          Discover Movies
        </Heading>
        <Select
          w={"200px"}
          onChange={(e) => {
            setActivePage(1);
            setSortValue(e.target.value);
          }}
        >
          <option value="popularity.desc">Popular</option>
          <option value="vote_average.desc&vote_count.gte=1000">
            Top Rated
          </option>
        </Select>
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
        {movies &&
          movies?.map((item, index) =>
            isLoading ? (
              <Skeleton key={index} height={"350px"} />
            ) : (
              <MovieCard key={index} item={item} mediaType={"movie"} />
            )
          )}
      </Grid>
      <PaginationComponent
        activePage={activePage}
        totalPages={totalPages}
        setActivePage={setActivePage}
      />
    </Container>
  );
};

export default Movies;
