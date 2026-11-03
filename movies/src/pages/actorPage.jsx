
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getActor, getActorMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";

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
      <h1>{actor.name}</h1>
      <p>{actor.biography}</p>
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
