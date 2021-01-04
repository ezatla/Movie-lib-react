import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import tw from "twin.macro";
import { MovieContext } from "../context/movieContext";
import MovieCast from "./MovieCast";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faLink, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Rating from "react-rating";
import Spinner from "./Spinner";

const MovieDetail = ({ fetchTheId }) => {
  const { isLoading, setLoading } = useContext(MovieContext);

  const { movieId } = useParams();
  const [state, setState] = useState({ movie: [] });

  // console.log(state);

  // Function to get movies
  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      const result = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}`,
      });
      setState({ movie: result.data });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [movieId]);
  // running fetchMovies on render with useEffect
  useEffect(() => {
    fetchMovies();
  }, []);
  const {
    poster_path,
    original_title,
    overview,
    tagline,
    vote_average,
    runtime,
    spoken_languages,
    release_date,
    genres,
    id,
    homepage,
    imdb_id,
  } = state.movie;

  // Function to destruture the year from date
  const splitYear = (date) => {
    if (!date) {
      return;
    }
    const [year] = date.split("-");
    return year;
  };

  // Render info of movie
  const renderInfo = (languages, time, data) => {
    const info = [];
    if (languages) {
      info.push(languages[0].name);
    }
    info.push(time, data);
    return info
      .filter((el) => el !== null)
      .map((el) => (typeof el === "number" ? `${el} min.` : el))
      .map((el, i, array) => (i !== array.length - 1 ? `${el} / ` : el));
  };

  const renderGenres = (genres) => {
    if (genres) {
      return (
        <div className="genres">
          <p className="genres_heading">The Genres</p>
          {genres.map((gen) => (
            <span key={gen.id}>{gen.name} / </span>
          ))}
        </div>
      );
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <Wrapper onLoad={() => fetchTheId(movieId)}>
      <PosterWrapper>
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt="movieThumb"
        />
      </PosterWrapper>
      <MoviedetailsWrapper>
        <div>
          <h1>{original_title}</h1>
          <h4>{tagline}</h4>
        </div>
        <div className="rating">
          <Rating
            emptySymbol={<FontAwesomeIcon icon={["far", "star"]} size="lg" />}
            fullSymbol={<FontAwesomeIcon icon={faStar} size="lg" />}
            initialRating={vote_average / 2}
            stop={5}
            readonly
            className="rating_child"
          />
          {renderInfo(spoken_languages, runtime, splitYear(release_date))}
        </div>
        <div>{renderGenres(genres)}</div>
        <div className="overview">
          <h3>The Overview</h3>
          <p>{overview}</p>
        </div>
        <MovieCast movieId={id} />
        <a href={homepage} className="secondary_btn">
          <Button>
            Website{" "}
            <span>
              <FontAwesomeIcon icon={faLink} />
            </span>
          </Button>
        </a>
        <a
          href={`https://www.imdb.com/title/${imdb_id}`}
          className="secondary_btn"
        >
          <Button>
            IMDB{" "}
            <span>
              <FontAwesomeIcon icon={["fab", "imdb"]} />
            </span>
          </Button>
        </a>
        <Link to={`/discover/popular`} className="secondary_btn">
          <Button>
            Back{" "}
            <span>
              <FontAwesomeIcon icon={faArrowLeft} />
            </span>{" "}
          </Button>
        </Link>
      </MoviedetailsWrapper>
    </Wrapper>
  );
};

export default MovieDetail;

// Styles

const Wrapper = styled.div`
  ${tw`flex flex-wrap -mx-8 md:mt-12`}
  overflow: hidden;
`;
const PosterWrapper = styled.div`
  ${tw`w-full sm:w-full md:w-2/5 px-8 flex justify-center rounded-md`}

  & img {
    ${tw`rounded-md`}

    max-height: 36rem;
  }
`;
const MoviedetailsWrapper = styled.div`
  ${tw`w-full sm:w-full md:w-2/5 overflow-hidden leading-relaxed container mx-auto px-10`}

  h1 {
    ${tw`text-2xl md:text-4xl leading-loose tracking-wider uppercase font-light`}
  }
  h4 {
    ${tw`text-base md:text-base leading-loose tracking-normal uppercase font-semibold`}
  }

  .rating {
    ${tw`text-gray-500 leading-normal`}
    .rating_child {
    ${tw`mr-10 md:mr-20`}
      color: initial;
    }
    span {
      font-size: 10px;
      margin-right: 5px;
    }
  }
  .genres {
    span {
      ${tw`text-xs tracking-normal uppercase font-semibold text-gray-500 ml-2`}
    }
    .genres_heading {
      ${tw`text-base tracking-normal uppercase font-semibold mt-6`}
    }
  }
  .overview {
    h3 {
      ${tw`text-base leading-loose tracking-normal uppercase font-semibold mt-6`}
    }
    p {
      ${tw`text-sm tracking-normal text-gray-800`}
    }
  }
`;

const Button = styled.button`
  ${tw`font-normal py-1 px-2 md:px-4 border rounded-full mr-6 mt-10 text-base leading-6 tracking-wide hover:bg-gray-800 hover:text-white transition duration-150 ease-in-out`}
`;
