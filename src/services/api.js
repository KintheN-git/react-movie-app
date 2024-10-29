import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;
export const imageUrl = "https://image.tmdb.org/t/p/w500";
export const imageUrlOriginal = "https://image.tmdb.org/t/p/original";

//trending
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Trending Movies and TV Shows
export const getTrending = async (timeWindow = "day") => {
  const { data } = await axios.get(
    `${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`
  );

  return data?.results;
};

// üstteki fonksiyon ile aynı işe yarar
// export const getTrending = async (timeWindow = "day") => {
//   const moviesResponse = await axios.get(
//     `${baseUrl}/trending/movie/${timeWindow}?api_key=${apiKey}`
//   );
//   const tvShowsResponse = await axios.get(
//     `${baseUrl}/trending/tv/${timeWindow}?api_key=${apiKey}`
//   );

//   // Film ve TV şovlarını birleştir
//   const combinedResults = [
//     ...moviesResponse.data?.results.filter((item) => item.poster_path),
//     ...tvShowsResponse.data?.results.filter((item) => item.poster_path),
//   ];

//   // Karıştır ve döndür
//   return shuffleArray(combinedResults);
// };
// movies and series details
export const getDetails = async (mediaType, id) => {
  const res = await axios.get(
    `${baseUrl}/${mediaType}/${id}?api_key=${apiKey}`
  );
  return res?.data;
};

// movies and series credits
export const getCredits = async (mediaType, id) => {
  const res = await axios.get(
    `${baseUrl}/${mediaType}/${id}/credits?api_key=${apiKey}`
  );
  return res?.data;
};

// movies and series videos
export const getVideos = async (mediaType, id) => {
  const res = await axios.get(
    `${baseUrl}/${mediaType}/${id}/videos?api_key=${apiKey}`
  );
  return res?.data;
};

// discover movies
export const getDiscoverMovies = async (page, sortValue) => {
  const res = await axios.get(
    `${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sortValue}`
  );
  return res?.data;
};

// discover tv shows
export const getDiscoverTvShows = async (page, sortValue) => {
  const res = await axios.get(
    `${baseUrl}/discover/tv?api_key=${apiKey}&page=${page}&sort_by=${sortValue}`
  );
  return res?.data;
};

// search
export const getSearch = async (query, page) => {
  const res = await axios.get(
    `${baseUrl}/search/multi?api_key=${apiKey}&query=${query}&page=${page}`
  );
  return res?.data;
};
