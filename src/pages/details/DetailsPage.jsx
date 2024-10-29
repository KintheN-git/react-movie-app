import {
  Badge,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCredits,
  getDetails,
  getVideos,
  imageUrl,
  imageUrlOriginal,
} from "../../services/api";
import {
  CalendarIcon,
  CheckCircleIcon,
  SmallAddIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import {
  minuteToHoursAndMinutes,
  raitingToPercentage,
  resolveRatingColor,
} from "../../utils/helpers";
import { m } from "framer-motion";
import VideoComponent from "../../components/VideoComponent";
import { useAuth } from "../../context/useAuth";
import { useFirestore } from "../../services/firestore";
import { a } from "framer-motion/client";

const DetailsPage = () => {
  const params = useParams();
  const { mediaType, id } = params;
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [credits, setCredits] = useState({});
  const [videoData, setVideoData] = useState({});
  const [videosData, setVideosData] = useState({});
  const { user } = useAuth();
  const toast = useToast();
  const { addToWatchList, checkWatchList, removeFromWatchList } =
    useFirestore();
  const [isInWatchList, setIsInWatchList] = useState(false);
  const handleAddToWatchList = async () => {
    if (!user) {
      toast({
        title: "Please login to add to watch list",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    const media = {
      id: details.id,
      title: details.title || details.name,
      media_type: mediaType,
      poster_path: details.poster_path,
      backdrop_path: details.backdrop_path,
      releaseDate: details.release_date || details.first_air_date,
      vote_average: details.vote_average,
      overview: details.overview,
    };
    const mediaId = media?.id.toString();
    await addToWatchList(user?.uid, mediaId, media);
    const isInWatchList = await checkWatchList(user?.uid, mediaId);
    setIsInWatchList(isInWatchList);
  };

  const handleRemoveFromWatchList = async () => {
    await removeFromWatchList(user?.uid, id);
    const isInWatchList = await checkWatchList(user?.uid, id);
    setIsInWatchList(isInWatchList);
  };

  useEffect(() => {
    if (!user) {
      setIsInWatchList(false);
      return;
    }
    checkWatchList(user?.uid, id).then((res) => setIsInWatchList(res));
  }, [user?.uid, id]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const [detailsResponse, creditsResponse, videoResponse] =
          await Promise.all([
            getDetails(mediaType, id),
            getCredits(mediaType, id),
            getVideos(mediaType, id),
          ]);
        setDetails(detailsResponse);
        setCredits(creditsResponse);
        const trailer = videoResponse?.results?.find(
          (item) => item.type === "Trailer"
        );
        setVideoData(trailer);
        const otherVideos = videoResponse?.results
          ?.filter((item) => item.type !== "Trailer")
          ?.slice(0, 10);

        setVideosData(otherVideos);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [mediaType, id]);

  if (isLoading) {
    return (
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        h={"50vh"}
        w={"100vw"}
      >
        <Spinner size={"xl"} color="red" />
      </Flex>
    );
  }
  const title = details?.title || details?.name;
  const releaseDate = details?.release_date || details?.first_air_date;
  return (
    <Box>
      <Box
        background={`linear-gradient(rgba(0,0,0,.70), rgba(0,0,0,.70)), url(${imageUrlOriginal}/${details?.backdrop_path})`}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        h={{ base: "auto", md: "500px" }}
        w={"100%"}
        py={2}
        display={"flex"}
        alignItems={"center"}
        zIndex={-1}
      >
        <Container maxW={"container.xl"}>
          <Flex
            alignItems={"center"}
            gap={10}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Image
              src={`${imageUrl}/${details?.poster_path}`}
              alt={details?.title || details?.name}
              borderRadius={"sm"}
              height={"450px"}
            ></Image>
            <Box>
              <Heading fontSize={"3xl"}>
                {title + " "}
                <Text as={"span"} color={"GrayText"} fontWeight={"normal"}>
                  {new Date(releaseDate).getFullYear()}
                </Text>
              </Heading>
              <Flex alignItems={"center"} gap={4} mt={1} mb={5}>
                <Flex alignItems={"center"}>
                  <CalendarIcon mr={2} color={"gray.400"} />
                  <Text>
                    {new Date(releaseDate).toLocaleDateString("en-US")} (US)
                  </Text>
                </Flex>
                {mediaType === "movie" ? (
                  <Flex alignItems={"center"}>
                    <TimeIcon mr={2} color={"gray.400"} />
                    <Text fontSize={"sm"}>
                      {minuteToHoursAndMinutes(details?.runtime)}
                    </Text>
                  </Flex>
                ) : null}
              </Flex>
              <Flex alignItems={"center"} gap={4}>
                <CircularProgress
                  value={raitingToPercentage(details?.vote_average)}
                  bg={"gray.800"}
                  color={resolveRatingColor(details?.vote_average)}
                  borderRadius={"full"}
                  size={"70px"}
                  p={"0.5"}
                  thickness={"6px"}
                >
                  <CircularProgressLabel fontSize={"lg"}>
                    {raitingToPercentage(details?.vote_average)}
                    <Box as={"span"} color={"gray.400"} fontSize={"small"}>
                      %
                    </Box>
                  </CircularProgressLabel>
                </CircularProgress>
                <Text display={{ base: "none", md: "initial" }}>
                  User Score
                </Text>
                <Button
                  display={isInWatchList ? "initial" : "none"}
                  leftIcon={<CheckCircleIcon />}
                  colorScheme={"green"}
                  variant={"outline"}
                  onClick={handleRemoveFromWatchList}
                >
                  In Watchlist
                </Button>
                <Button
                  display={!isInWatchList ? "initial" : "none"}
                  leftIcon={<SmallAddIcon />}
                  variant={"outline"}
                  onClick={handleAddToWatchList}
                >
                  Add to Watchlist
                </Button>
              </Flex>
              <Text
                color={"gray.400"}
                fontStyle={"italic"}
                fontSize={"sm"}
                my={5}
              >
                {details?.tagline}
              </Text>
              <Heading fontSize={"xl"} mb={3}>
                Overview
              </Heading>
              <Text fontSize={"md"} mb={3}>
                {details?.overview}
              </Text>
              <Flex mt={6} gap={2}>
                {details?.genres?.map((genre, index) => (
                  <Badge key={index} p={1}>
                    {genre.name}
                  </Badge>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Container maxW={"container.xl"} pb={"10"}>
        <Heading
          as={"h2"}
          fontSize={"md"}
          textTransform={"uppercase"}
          mt={"10"}
        >
          Cast
        </Heading>
        <Flex
          py={"1"}
          mt={"5"}
          mb={"10"}
          overflowX={"scroll"}
          gap={"5"}
          css={{
            "&::-webkit-scrollbar": {
              width: "2px", // Scrollbar genişliği
            },
            "&::-webkit-scrollbar-thumb": {
              background: "gray", // Scrollbar rengi
              borderRadius: "2px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "red", // Scrollbar hover rengi
            },
          }}
        >
          {credits?.cast?.length === 0 && <Text>No Cast Found</Text>}
          {credits?.cast?.map((cast, index) => (
            <Box key={index} minW={"150px"}>
              <Image
                src={
                  cast.profile_path
                    ? `${imageUrl}/${cast.profile_path}`
                    : "/src/assets/no-photo-found.webp"
                }
                alt={cast?.name}
                w={"100%"}
                height={"225px"}
                objectFit={"cover"}
                borderRadius={"sm"}
              />
            </Box>
          ))}
        </Flex>
        <Heading
          as={"h2"}
          fontSize={"md"}
          textTransform={"uppercase"}
          mt={"10"}
          mb={"5"}
        >
          Videos
        </Heading>
        <VideoComponent id={videoData?.key} small={false} />
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          gap={10}
          mt={"5"}
          mb={"10"}
          py={"1"}
          overflow={"scroll"}
          css={{
            "&::-webkit-scrollbar": {
              width: "2px", // Scrollbar genişliği
            },
            "&::-webkit-scrollbar-thumb": {
              background: "gray", // Scrollbar rengi
              borderRadius: "2px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "red", // Scrollbar hover rengi
            },
          }}
        >
          {videosData?.map((video, index) => (
            <Box key={video.id} minW={"290px"}>
              <VideoComponent id={video.key} small={true} />
              <Text fontSize={"sm"} fontWeight={"bold"} mt={2} noOfLines={2}>
                {video.name}
              </Text>
            </Box>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default DetailsPage;
