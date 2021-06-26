import { useState } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import SideBar from "./Components/SideBar/SideBar";
import MainPage from "./Components/MaiPage/MainPage";
import Explore from "./Components/Explore/Explore";
import Library from "./Components/Library/Library";
import Footer from "./Components/Footer/Footer";
import VideoPlayer from "./Components/VideoPlayer/VideoPlayer";
import Account from "./Components/Account/Account";
import Login from "./Components/Login/Login";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./Store/AuthContext";

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const {
    authState: { isUserLoggedIn },
  } = useAuth();

  return (
    <div className="App">
      <NavBar setShowMenu={setShowMenu} showMenu={showMenu} />
      <SideBar setShowMenu={setShowMenu} showMenu={showMenu} />
      <Switch>
        <Route path="/auth" component={Login} />
        <Route path="/account" component={isUserLoggedIn ? Account : Login} />
        <Route path="/library" component={isUserLoggedIn ? Library : Login} />
        <Route path="/explore" component={Explore} />
        <Route path="/watch/:videoID" component={VideoPlayer} />
        <Route path="/" component={MainPage} />
      </Switch>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
