import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Menu from "./components/Menu";
import ProjectLog from "./components/ProjectLog";
import About from "./components/About";
import audioContext from "./components/contexts/audioContext";

function App() {
  const [playAudio, setPlayAudio] = useState(false);
const [aud, setAud] = useState([]);
  return (
    <div className="App">
      <audioContext.Provider value={{ playAudio, setPlayAudio, aud, setAud }}>
        <Router>
          <Menu />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            {/* <Route path="/about" element={<About />}></Route>
            <Route path="/log" element={<ProjectLog />}></Route> */}
          </Routes>
        </Router>
      </audioContext.Provider>
    </div>
  );
}

export default App;
