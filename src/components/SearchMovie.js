import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import tw from "twin.macro";
import styled from "styled-components";
import axios from "axios";
import { MovieContext } from "../context/movieContext";

import MovieCard from "./MovieCard";
import Search from "./Search";

// Styles
const MainWrapper = tw.div`md:w-10/12 container mx-auto px-10`;
const CardHeader = styled.div`
  ${tw`w-full pb-10 -my-5`}
  & h1 {
    ${tw`mt-12 font-light uppercase text-4xl`}
  }
`;
const CardWrapper = styled.div`
  ${tw`flex flex-wrap`}
  & button {
    margin: auto 0 auto auto;
    background: #223949;
  }
`;

const SearchMovie = () => {
  const { isLoading, setLoading } = useContext(MovieContext);
  const [state, setState] = useState({ movies: [], page: 1 });

  console.log(state);

  let { name } = useParams();

  // // Load More
  const loadMoreMovies = async () => {
    // const popularEndpoint =
    try {
      setLoading(true);
      const result = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/search/movie?api_key=${
          process.env.REACT_APP_API_KEY
        }&page=${state.page + 1}&query=${name}`,
      });
      console.log(result);
      setState((prev) => ({
        ...prev,
        movies: result.data.results,
        page: result.data.page,
      }));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to get movies
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const result = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${name}`,
      });
      // console.log(result);
      setState((prev) => ({
        ...prev,
        movies: result.data.results,
        page: result.data.page,
      }));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  // running fetchMovies on render with useEffect
  useEffect(() => {
    fetchMovies();
  }, [name]);

  if (isLoading) return <p>Loadinng......</p>;
  if (!state.movies) return <p>No Movie Found</p>;
  return (
    <div>
      {!isLoading && (
        <MainWrapper>
          <Search />
          <CardHeader>
            <h1>{name}</h1>
            <p>search results</p>
          </CardHeader>
          <CardWrapper>
            {state.movies.map((movie) => {
              return <MovieCard movie={movie} key={movie.id}></MovieCard>;
            })}

            {state.page && (
              <button onClick={loadMoreMovies}>Page {state.page + 1}</button>
            )}
          </CardWrapper>
        </MainWrapper>
      )}
    </div>
  );
};

export default SearchMovie;
