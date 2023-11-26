import React, { useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import { getTrendingMovies } from '../api/tmdb-api';

const TrendingMoviesPage = (props) => {
  const { data, error, isLoading, isError } = useQuery('trending', getTrendingMovies);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const movies = data.results;

      const favorites = movies.filter(m => m.favorite);
      localStorage.setItem('favorites', JSON.stringify(favorites));

      const mustWatch = movies.filter(m => m.mustWatch);
      localStorage.setItem('mustWatch', JSON.stringify(mustWatch));
    }
  }, [data, isLoading, isError]);

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  return (
    <PageTemplate
      title="Trending Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}
    />
  );
};

export default TrendingMoviesPage;
