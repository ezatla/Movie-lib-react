import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import Rating from "react-rating";

const CardContent = styled.div`
  ${tw`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 text-center py-4`}

  & {
    div {
      ${tw`rounded-md pb-4`}
      overflow: hidden;
      transition: box-shadow 0.4s ease-in-out;

      &:hover {
        box-shadow: 0px 6px 10px 6px #9e9e9e;
      }
    }
  }
`;

const MovieCard = ({ movie }) => {
  return (
    <CardContent>
      <Link to={`/movie/${movie.id}`}>
        <div>
          <img
            src={`http://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt=""
          />
          <h4>{movie.original_title}</h4>
          <Rating
            emptySymbol={<FontAwesomeIcon icon={["far", "star"]} size="lg" />}
            fullSymbol={<FontAwesomeIcon icon={faStar} size="lg" />}
            initialRating={movie.vote_average / 2}
            stop={5}
            readonly
          />
        </div>
      </Link>
    </CardContent>
  );
};

export default MovieCard;
