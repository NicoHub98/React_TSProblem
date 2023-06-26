import { useState } from "react";
import "./App.css";
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import { GlobalContext } from "./context/GlobalContext";

function App() {
  const [toggle, setToggle] = useState(false);

  return (
    <GlobalContext.Provider value={{ toggle, setToggle }}>
      <div className="App">
        <Navbar />
        <Map />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
