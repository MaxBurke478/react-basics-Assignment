
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getActor, getActorMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import Typography from "@mui/material/Typography";

const ActorPage = () => {
  const { id } = useParams();

  const { data: actor, isPending: actorPending } = useQuery({
    queryKey: ["actor", { id }],
    queryFn: getActor,
  });

  const {
    data: credits,error,isPending: creditsPending,isError,
  } = useQuery({
    queryKey: ["actorMovies", { id }],
    queryFn: getActorMovies,
  });
  if (actorPending || creditsPending) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <Typography variant="h4" sx={{ color: "white" }}>
        {actor.name}
      </Typography>

      <Typography variant="h7" sx={{ color: "white" }}>
        {actor.biography}
      </Typography>
      <PageTemplate
        title={`Movies featuring ${actor.name}`}
        movies={credits.cast}
        action={(movie) => {
          return <AddToPlaylistIcon movie={movie} />;
        }}
      />
    </>
  );
};
export default ActorPage;
