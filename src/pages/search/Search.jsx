import {
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { getSearch } from "../../services/api";
import MovieCard from "../../components/MovieCard";
import PaginationComponent from "../../components/PaginationComponent";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    setActivePage(1); // Arama terimi değiştiğinde sayfayı sıfırla
    fetchData(1); // İlk sayfadan verileri çek
  };

  const fetchData = (page = activePage) => {
    setIsLoading(true);
    getSearch(searchValue, page)
      .then((res) => {
        setData(res.results);
        setActivePage(res.page);
        setTotalPages(res.total_pages);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (searchValue) {
      fetchData(); // Sayfa değiştiğinde yeni verileri çek
    }
  }, [activePage]);

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={4}>
        <Heading as={"h2"} fontSize={"md"} textTransform={"uppercase"} my={10}>
          Search
        </Heading>
      </Flex>

      <form onSubmit={handleSearch}>
        <Input
          type="text"
          placeholder="Search Movies and TV Shows"
          _placeholder={{ color: "gray.100" }}
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          focusBorderColor="red.500"
        ></Input>
      </form>

      {isLoading && (
        <Flex justifyContent={"center"} mt="10">
          <Spinner size={"xl"} color="red" />
        </Flex>
      )}

      {data.length === 0 && !isLoading && (
        <Flex justifyContent={"center"} mt="10">
          <Heading
            as={"h2"}
            fontSize={"md"}
            textTransform={"uppercase"}
            my={10}
          >
            No results found
          </Heading>
        </Flex>
      )}

      <Grid
        mt={10}
        templateColumns={{
          base: "1fr",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={4}
      >
        {!isLoading &&
          data
            .filter(
              (item) => item.media_type === "tv" || item.media_type === "movie"
            )
            .map((item, index) => (
              <MovieCard key={index} item={item} mediaType={item.media_type} />
            ))}
        {isLoading &&
          Array(10)
            .fill("")
            .map((_, index) => <Skeleton key={index} height={"350px"} />)}
      </Grid>
      {data.length > 0 && !isLoading && (
        <PaginationComponent
          activePage={activePage}
          totalPages={totalPages}
          setActivePage={(page) => {
            setActivePage(page); // Sayfa numarasını güncelle
          }}
        />
      )}
    </Container>
  );
};

export default Search;
