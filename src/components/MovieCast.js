import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import tw from "twin.macro";
import styled from "styled-components";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NoImage from "../assets/noUser.png";

const MovieCast = ({ movieId }) => {
  const [state, setState] = useState({ cast: [] });
  const [isLoading, setLoading] = useState(false);
  const fetchCast = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/movie/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}`
      );
      setState((prevState) => ({ ...prevState, cast: response.data.cast }));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCast();
  }, []);

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "-100px",
    slidesToShow: 8,
    swipeToSlide: true,
    afterChange: function (index) {},
  };
  return (
    <Wrapper>
      <h4>The Cast</h4>
      <SlickWrapper>
        <Slider {...settings}>
          {state.cast.map((ct) => {
            return (
              <CastWrapper key={ct.id}>
                {ct.profile_path ? (
                  <img
                    src={`http://image.tmdb.org/t/p/w500${ct.profile_path}`}
                    alt="profile"
                  />
                ) : (
                  <img src={NoImage} alt="" />
                )}
              </CastWrapper>
            );
          })}
        </Slider>
      </SlickWrapper>
    </Wrapper>
  );
};

export default MovieCast;

// Styles

const Wrapper = tw.div`w-screen overflow-hidden mt-6`;

const SlickWrapper = styled.div`
  ${tw`overflow-hidden outline-none`}
 
  & .slick-slide {
    /* max-width: 100px !important; */
  }

  & * div:focus {
    outline: none;
  }
`;

const CastWrapper = styled.div`
  cursor: pointer;

  & img {
    border-radius: 50%;
    object-fit: cover;
    overflow: hidden;
    width: 3rem;
    height: 3rem;
  }
`;
