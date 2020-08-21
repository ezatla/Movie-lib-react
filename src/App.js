import React, {useState} from "react";
import tw from "twin.macro";
import { Route, Switch, Redirect, useLocation, useParams } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import MainHome from "./components/MainHome";
import TopRated from "./components/TopRated";
import Upcoming from "./components/Upcoming";
import MovieDetail from "./components/MovieDetail";
import SearchMovie from "./components/SearchMovie";

const HomeWrapper = tw.div`flex`;

const App = () => {

  const [movieId, setMovieId] = useState(null)

  let location = useLocation();
  // let { movieId } = useParams();

  const handleFetchId = (fetchedMovieId) => {
    setMovieId(fetchedMovieId)
  }

  
  return (
    <HomeWrapper>
      {location.pathname !== `/movie/${movieId}` && <Sidebar />}

      <Switch>
        <Redirect exact from="/" to="discover/popular" />
        <Route exact path="/discover/popular">
          <MainHome />
        </Route>
        <Route exact path="/discover/top rated">
          <TopRated />
        </Route>
        <Route exact path="/discover/upcoming">
          <Upcoming />
        </Route>
        <Route exact path="/search/:name">
          <SearchMovie />
        </Route>
        <Route path="/movie/:movieId">
          <MovieDetail fetchTheId={handleFetchId}/>
        </Route>
      </Switch>
    </HomeWrapper>
  );
};

export default App;
