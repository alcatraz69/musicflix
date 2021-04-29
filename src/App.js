
import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar'
import SideBar from './components/SideBar/SideBar'
import Banner from './components/Banner/Banner'

function App() {

  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="App">
      <NavBar setShowMenu={setShowMenu} showMenu={showMenu} />
      <SideBar setShowMenu={setShowMenu} showMenu={showMenu} />
      <Banner/>
    </div>
  );
}

export default App;
