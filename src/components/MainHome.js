import React, { useState, useEffect, useContext } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import axios from "axios";
import { MovieContext } from "../context/movieContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import MovieCard from "./MovieCard";
import Search from "./Search";

const MainHome = () => {
  const { isLoading, setLoading } = useContext(MovieContext);
  const [state, setState] = useState({ movies: [], page: 1 });

  console.log(state);

  // // Load More
  const loadMoreMovies = async () => {
    // const popularEndpoint =
    try {
      setLoading(true);
      const result = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/movie/popular?api_key=${
          process.env.REACT_APP_API_KEY
        }&page=${state.page + 1}`,
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
        url: `${process.env.REACT_APP_API_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`,
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
  }, []);

  if (isLoading) return <p>Loadinng......</p>;

  return (
    <>
      {!isLoading && (
        <MainWrapper>
          <Search />
          <CardHeader>
            <h1>Popular</h1>
            <p>Movies</p>
          </CardHeader>
          <CardWrapper>
            {state.movies.map((movie) => {
              return <MovieCard movie={movie} key={movie.id}></MovieCard>;
            })}

            {state.page && (
              <button onClick={loadMoreMovies} className="page_btn">
                Page {state.page + 1} <FontAwesomeIcon icon={faArrowRight} />
              </button>
            )}
          </CardWrapper>
        </MainWrapper>
      )}
    </>
  );
};

export default MainHome;

// Styles
const MainWrapper = tw.div`sm:w-full md:w-10/12 container mx-auto px-10`;
const CardHeader = styled.div`
  ${tw`w-full pb-10 -my-5`}
  & h1 {
    ${tw`mt-12 font-light uppercase text-4xl`}
  }
`;
const CardWrapper = styled.div`
  ${tw`flex flex-wrap`}

  .page_btn {
    margin: auto 0 auto auto;
    background: #607d8b;
    padding: 5px 16px;
    border-radius: 50px;
    margin-bottom: 1rem;
    color: #fff;
    font-size: 14px;
    outline: none;

    & svg{
      margin-left: 4px;
    }
  }
`;
