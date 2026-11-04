import { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getPopularMovies } from "../api/tmdb-api";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";


const PopularPage = () => {
  const [movies, setMovies] = useState([]);

 useEffect(() => {
    getPopularMovies().then(movies => {
      setMovies(movies);
    });
  }, []);
  
  return (
    <PageTemplate
      title='Popular Movies'
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />;
      }}
    />
  );
};
export default PopularPage;
