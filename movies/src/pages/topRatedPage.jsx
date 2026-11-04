import { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getTopRatedMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const TopRatedPage = () => {
  const [movies, setMovies] = useState([]);

 useEffect(() => {
    getTopRatedMovies().then(movies => {
      setMovies(movies);
    });
  }, []);

    const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  const addToFavorites = (movieId) => true;
  
  return (
    <PageTemplate
      title='Top Rated Movies'
      movies={movies}
      action={(movie) => {
         return <AddToFavoritesIcon movie={movie} />;
      }}
    />
  );
};
export default TopRatedPage;
