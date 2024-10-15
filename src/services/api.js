import axios from "axios";
import { time } from "framer-motion/client";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;
export const imageUrl = "https://image.tmdb.org/t/p/w500";
export const imageUrlOriginal = "https://image.tmdb.org/t/p/original";

//trending
export const getTrendingMovies = async (timeWindow = "day") => {
  const { data } = await axios.get(
    `${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`
  );
  return data?.results;
};
