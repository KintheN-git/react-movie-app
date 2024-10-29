import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { imageUrl, imageUrlOriginal } from "../services/api";
import { useFirestore } from "../services/firestore";
import { useAuth } from "../context/useAuth";
import { CheckIcon, StarIcon } from "@chakra-ui/icons";

const WatchlistCard = ({ type, item, setWatchList }) => {
  const { removeFromWatchList } = useFirestore();
  const { user } = useAuth();

  const handleRemoveClick = (event) => {
    event.preventDefault(); // Prevent the default behavior (link redirection)
    removeFromWatchList(user?.uid, item.id).then(() => {
      setWatchList((prev) => prev.filter((el) => el.id !== item.id));
    });
  };

  return (
    <Link to={`/${type}/${item.id}`}>
      <Box
        className="backlayer"
        background={`linear-gradient(rgba(0,0,0,.70), rgba(0,0,0,.70)), url(${imageUrlOriginal}/${item.backdrop_path})`}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        h={{ base: "auto", md: "250px" }}
        w={"100%"}
        py={2}
        display={"flex"}
        alignItems={"center"}
        zIndex={-1}
        transition="background-size 2s ease-in-out"
        _hover={{
          backgroundSize: "cover",
          transition: "background-size 2s ease-in-out",
        }}
      >
        <Flex gap="4">
          <Box position={"relative"} w={"150px"}>
            <Image
              src={`${imageUrl}/${item.poster_path}`}
              alt={item.title}
              height={"200px"}
              minW={"150px"}
              objectFit={"cover"}
            />
            <Tooltip label="Remove from watchlist">
              <IconButton
                aria-label="Remove from watchlist"
                icon={<CheckIcon />}
                size={"sm"}
                colorScheme="green"
                position={"absolute"}
                zIndex={"999"}
                top="2px"
                left={"2px"}
                onClick={handleRemoveClick}
              />
            </Tooltip>
          </Box>

          <Box>
            <Heading fontSize={{ base: "xl", md: "2xl" }} noOfLines={1}>
              {item?.title || item?.name}
            </Heading>
            <Heading fontSize={"sm"} color={"green.200"} mt="2">
              {new Date(
                item?.releaseDate || item?.first_air_date
              ).getFullYear() || "N/A"}
            </Heading>
            <Flex alignItems={"center"} gap={2} mt="4">
              <StarIcon fontSize={"small"} />
              <Text textAlign={"center"} fontSize="small">
                {item?.vote_average?.toFixed(1)}
              </Text>
            </Flex>
            <Text mt="4" fontSize={{ base: "xs", md: "sm" }} noOfLines={5}>
              {item?.overview}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Link>
  );
};

export default WatchlistCard;
