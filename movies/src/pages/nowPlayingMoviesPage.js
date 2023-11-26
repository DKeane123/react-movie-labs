import React, { useEffect } from "react";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { getNowPlayingMovies } from '../api/tmdb-api';

const NowPlayingMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery('nowPlaying', getNowPlayingMovies);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const movies = data.results;

      const favorites = movies.filter(m => m.favorite);
      const mustWatch = movies.filter(m => m.mustWatch);

      localStorage.setItem('favorites', JSON.stringify(favorites));
      localStorage.setItem('mustWatch', JSON.stringify(mustWatch));
    }
  }, [data, isLoading, isError]);

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  return (
    <PageTemplate
      movies={movies}
      title="Now Playing Movies"
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default NowPlayingMoviesPage;
