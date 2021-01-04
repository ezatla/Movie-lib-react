import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import tw from "twin.macro";
import styled from "styled-components";
import StickyBox from "react-sticky-box";
import { MovieContext } from "../context/movieContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCalendar,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const { burgerMenu, setBurgerMenu } = useContext(MovieContext);

  return (
      <>
      {burgerMenu && <Layer onClick={() => setBurgerMenu(false)} />}

      <SidebarWrapper
        style={{transform: burgerMenu ? "translateX(0%)" : ""}}
        onClick={() => setBurgerMenu(false)}
      >
        <StickyBox offsetTop={0} offsetBottom={200}>
          <SidebarItem>
            <NavLink
              className="sidebarItem"
              activeClassName="isActive"
              to="/discover/popular"
            >
              <FontAwesomeIcon className="sidebarIcon" icon={faHeart} /> popular
            </NavLink>
          </SidebarItem>
          <SidebarItem>
            <NavLink
              className="sidebarItem"
              activeClassName="isActive"
              to="/discover/top rated"
            >
              {" "}
              <FontAwesomeIcon className="sidebarIcon" icon={faChartBar} /> top
              rated
            </NavLink>
          </SidebarItem>
          <SidebarItem>
            <NavLink
              className="sidebarItem"
              activeClassName="isActive"
              to="/discover/upcoming"
            >
              <FontAwesomeIcon className="sidebarIcon" icon={faCalendar} />{" "}
              upcoming
            </NavLink>
          </SidebarItem>
        </StickyBox>
      </SidebarWrapper>
    </>
  );
};

export default Sidebar;

// styles

const MainWrapper = styled.div`
  
`;

const Layer = styled.div`
  background: #000;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 5;
  opacity: 0.4;
`;

const SidebarWrapper = styled.div`
  ${tw`flex md:w-2/12 justify-center mt-24`}

  @media (max-width: 1024px) {
    position: fixed;
    height: 100vh;
    width: 40%;
    background: #f1f3f5;
    z-index: 9;
    margin-top: 0;
    transform: translateX(-116%);
    transition: 280ms ease-in-out;
  }
  @media (max-width: 798.98px){
    width: 50%;
  }

`;

const SidebarItem = styled.div`
  ${tw`my-8`}
  & .sidebarItem {
    ${tw`my-8 py-2 px-6 text-gray-600`}
    &:hover {
      ${tw`text-gray-700`}
    }
  }
  & .sidebarIcon {
    margin-right: 10px;
  }
  & .isActive {
    ${tw`text-black border rounded-full border-gray-800`}
  }
`;
