import React, { useEffect } from "react";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { getTopRatedMovies } from '../api/tmdb-api'
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'

const TopRatedMoviesPage = (props) => {
  const { data, error, isLoading, isError } = useQuery('toprated', getTopRatedMovies);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const movies = data.results;
      const favorites = movies.filter(m => m.favorite)
      localStorage.setItem('favorites', JSON.stringify(favorites))

      const mustWatch = movies.filter(m => m.mustWatch)
      localStorage.setItem('mustWatch', JSON.stringify(mustWatch))
    }
  }, [data, isLoading, isError]);

  if (isLoading) return <Spinner />
  if (isError) return <h1>{error.message}</h1>
  
  return (
    <PageTemplate
      title="Top Rated Movies!"
      movies={data.results}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
  );
};

export default TopRatedMoviesPage;
