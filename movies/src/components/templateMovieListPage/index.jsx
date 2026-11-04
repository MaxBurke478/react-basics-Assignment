import { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);
  const [sortBy, setSortBy] = useState("popularity");

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });
displayedMovies = [...displayedMovies].sort((a, b) => {  //so it doesnt mess up original order of le movies array
  if (sortBy === "popularity") {
    return b.popularity - a.popularity;
  }
  if (sortBy === "rating") {
    return b.vote_average - a.vote_average;
  }
  if (sortBy === "newest") {
    return new Date(b.release_date) - new Date(a.release_date);
  }
  if (sortBy === "oldest") {
    return new Date(a.release_date) - new Date(b.release_date);
  }
  return 0;
});
const handleChange = (type, value) => {
  if (type === "name") {
    setNameFilter(value);
  }
  else if (type === "genre") {
    setGenreFilter(value);
  }
  else if (type === "sortBy") {
    setSortBy(value);
  }
};

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} 
          sx={{padding: "20px"}}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            sortBy={sortBy}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
