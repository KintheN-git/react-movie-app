import React, { useEffect, useState } from "react";
import Protected from "../../components/routes/Protected";
import { useFirestore } from "../../services/firestore";
import { useAuth } from "../../context/useAuth";
import { Container, Flex, Grid, Heading, Skeleton } from "@chakra-ui/react";
import MovieCard from "../../components/MovieCard";
import WatchlistCard from "../../components/WatchListCard";

const WatchList = () => {
  const { user } = useAuth();
  const { getWatchList } = useFirestore();
  const [watchList, setWatchList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (user?.uid) {
      getWatchList(user?.uid)
        .then((res) => {
          setWatchList(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={4} my={10}>
        <Heading as={"h2"} fontSize={"md"} textTransform={"uppercase"}>
          Watch List
        </Heading>
      </Flex>

      {!isLoading && watchList.length === 0 && (
        <Heading as={"h2"}>Your watch list is empty...</Heading>
      )}
      {/* flim grid alanı */}

      {!isLoading && watchList.length > 0 && (
        <Grid
          templateColumns={{
            base: "1fr",
          }}
          gap={4}
        >
          {watchList?.map((item) => (
            <WatchlistCard
              key={item.id}
              item={item}
              type={item.media_type}
              setWatchList={setWatchList}
            />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default WatchList;
