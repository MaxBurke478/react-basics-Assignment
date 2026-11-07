import { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getTrendingMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const TrendingPage = () => {
  const [movies, setMovies] = useState([]);

 useEffect(() => {
    getTrendingMovies().then(movies => {
      setMovies(movies);
    });
  }, []);

    const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  const addToFavorites = (movieId) => true;
  
  return (
    <PageTemplate
      title='Trending movies this week!'
      movies={movies}
      action={(movie) => {
         return <AddToFavoritesIcon movie={movie} />;
      }}
    />
  );
};

export default TrendingPage;
