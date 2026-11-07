import { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);
  const [sortBy, setSortBy] = useState("popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 20;

  let filteredMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });
filteredMovies = [...filteredMovies].sort((a, b) => {  //so it doesnt mess up original order of le movies array
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
const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);// Calculate the total number of pages based on the filtered movies and movies per page
const startIndex = (currentPage - 1) * moviesPerPage;  // Calculate the starting index for the current page
const displayedMovies = filteredMovies.slice( // slice the filtered movies array to get only the movies for the current page
  startIndex,
  startIndex + moviesPerPage
);   
const handleChange = (type, value) => {
  setCurrentPage(1); 
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
        {totalPages > 1 && (
          <Grid 
           size={12}
           sx={{display: "flex", justifyContent: "center", padding: 3}}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              color="primary" 
              size="large"
              shape="rounded"
              
            />
      </Grid>
        )}
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
