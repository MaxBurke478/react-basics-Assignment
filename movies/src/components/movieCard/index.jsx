import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import Avatar from '@mui/material/Avatar';
import img from '../../images/film-poster-placeholder.png';
import { Link } from "react-router";

export default function MovieCard({ movie, action }) {

  const { favorites, addToFavorites } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };
  
  return (
    <Card sx={{
        borderRadius: 3,
        boxShadow: 3,
        overflow: "hidden",
        transition: "0.3s",
        backgroundColor: "hsl(244, 95%, 29%)",
        "&:hover": {
          boxShadow: 6,
          transform: "scale(1.03)",
        },
      }}>
      <CardHeader
        avatar={
          movie.favorite ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p" fontWeight="bold" sx={{
              minHeight: 48,
              display: "flex",
              alignItems: "center",
              WebkitTextStroke: ".8px black",
              color: "white"
            }}>
            {movie.title}{" "}
          </Typography>
        }
        sx={{ pb: 1 }}
      />
      <CardMedia
        sx={{ height: 400, objectFit: "cover" }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent sx={{py:2}}>
        <Grid container alignItems="center" spacing={1}>
          <Grid size={{xs: 7}}>
            <Typography variant="body2" color="text.secondary" >
              <CalendarIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 0.5 }} />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid size={{xs: 5}}>
            <Typography variant="body2" fontWeight="bold" sx={{ textAlign: "right" }}>
              <StarRateIcon fontSize="small" sx ={{color:"#FFFF00",verticalAlign: "middle", mr: 0.5 }} />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ px: 2,pb: 2,justifyContent: "space-between"}}>
        {action(movie)}
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
        
      </CardActions>
    </Card>
  );
}
