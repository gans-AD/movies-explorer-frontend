import React from "react";
import "./App.css";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import Footer from "../Footer/Footer.js";
import Header from "../Header/Header";
import Main from "../Main/Main";
import PageNotFound from "../PageNotFound/PageNotFound";
import Preloader from "../Preloader/Preloader";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Navigation from "../Navigation/Navigation";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

//const [isPreloadActive, setPreloadActive]=React.useState(false);

function App() {
  const history = useHistory();
  const location = useLocation();
  const [currentUser, setCurrentUser] = React.useState({});

  const [isNavigationOpen, setNavigationOpen] = React.useState(false);

  React.useEffect(() => {
    closeNavigation();
  }, [location.pathname]);

  const redirectSignUp = () => {
    history.push("/signup");
  };

  const redirectSignIn = () => {
    history.push("/signin");
  };

  const redirectProfile = () => {
    history.push("/profile");
  };

  // открывние меню
  const handleMenuBtnClick = () => {
    setNavigationOpen(true);
  };

  // закрытие меню
  const closeNavigation = () => {
    setNavigationOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Header onRegBtn={redirectSignUp} onLoginBtn={redirectSignIn} />
            <Main />
            <Footer />
          </Route>
          <ProtectedRoute exact path="/movies">
            <Header
              onProfileBtn={redirectProfile}
              onMenuBtn={handleMenuBtnClick}
            />
            <Movies />
            <Navigation
              onClose={closeNavigation}
              isOpen={isNavigationOpen}
              onProfileBtn={redirectProfile}
            />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute exact path="/saved-movies">
            <Header
              onProfileBtn={redirectProfile}
              onMenuBtn={handleMenuBtnClick}
            />
            <SavedMovies />
            <Navigation
              onClose={closeNavigation}
              isOpen={isNavigationOpen}
              onProfileBtn={redirectProfile}
            />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute exact path="/profile">
            <Header
              onProfileBtn={redirectProfile}
              onMenuBtn={handleMenuBtnClick}
            />
            <Profile />
            <Navigation
              onClose={closeNavigation}
              isOpen={isNavigationOpen}
              onProfileBtn={redirectProfile}
            />
          </ProtectedRoute>
          <Route exact path="/signin">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Register />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        <Preloader />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
