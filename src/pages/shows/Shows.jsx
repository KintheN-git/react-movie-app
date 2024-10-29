import {
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  Skeleton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getDiscoverTvShows } from "../../services/api";
import MovieCard from "../../components/MovieCard";
import PaginationComponent from "../../components/PaginationComponent";

function Shows() {
  const [tvShows, setTvShows] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [sortValue, setSortValue] = useState("popularity.desc");

  useEffect(() => {
    setIsLoading(true);
    getDiscoverTvShows(activePage, sortValue).then((res) => {
      setActivePage(res?.page);
      setTotalPages(res?.total_pages);
      setTvShows(res?.results);
      setIsLoading(false);
    });
  }, [activePage, sortValue]);
  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={4}>
        <Heading as={"h2"} fontSize={"md"} textTransform={"uppercase"} my={10}>
          Discover Tv Shows
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
        {tvShows &&
          tvShows?.map((item, index) =>
            isLoading ? (
              <Skeleton key={index} height={"350px"} />
            ) : (
              <MovieCard key={index} item={item} mediaType={"tv"} />
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
}

export default Shows;
