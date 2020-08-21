import React, { useState, useRef, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { MovieContext } from "../context/movieContext";

import tw from "twin.macro";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  const [searchValue, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);

  // Context data
  const { burgerMenu, setBurgerMenu } = useContext(MovieContext);

  const ref = useRef(null);
  let history = useHistory();

  const handleSubmit = (e) => {
    // make func to run that fetch movie with search query
    e.preventDefault();
    history.push(`/search/${searchValue}`);
  };

  const handleChange = (e) => {
    // console.log(e.target.value);
    setSearch(e.target.value);
  };

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setToggle(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const toggleSearch = (e) => {
    e.preventDefault();
    setToggle(true);
  };

  const toggleMenu = () => {
    setBurgerMenu(true);
  };

  return (
    <Wrapper>
      <FontAwesomeIcon
        className="burger_menu_icon"
        icon={faBars}
        onClick={toggleMenu}
      />
      <form onSubmit={handleSubmit} className="search_form">
        <input
          type="text"
          placeholder="Search"
          onChange={handleChange}
          value={searchValue}
          onClick={toggleSearch}
          ref={ref}
          className={toggle ? 'toggle_search' : null}
        />
        <FontAwesomeIcon
          className="search_icon"
          icon={faSearch}
          onClick={toggleSearch}
        />
      </form>
    </Wrapper>
  );
};

export default Search;

const Wrapper = styled.div`
  ${tw`flex justify-end`}

  .search_form {
    position: relative;
    position: relative;
    margin-top: 2rem;
    margin-right: -20px;
    overflow: hidden;
    border-radius: 50px;

    input[type="text"] {
      background: #f1f3f5;
      border-radius: 46px;
      padding: 2px 10px;
      outline: none;
      transform: translateX(50%);
      transition: 0.2s ease-in-out;
      cursor: pointer;
    }

    .toggle_search {
      transform: translateX(0%) !important;
    }

    .search_icon {
      position: absolute;
      top: 6px;
      right: 10px;
      color: #b5b5b5;
      width: 0.9rem;
      cursor: pointer;
    }
  }
  .burger_menu_icon {
    position: absolute;
    left: 2rem;
    top: 2rem;
    cursor: pointer;
    @media (min-width: 1024px){
      display: none;
    }
  }
`;
