import React, { useContext } from "react";
import Visualiser from "./Visualiser";
import audioContext from "./contexts/audioContext";

function Home() {
  const { playAudio, setPlayAudio, setAud } = useContext(audioContext);

  return (
    <div>
      <h1 className="text-center text-primary fw-bold pt-4">
        Three.Js & R3F Audio Visualizer
      </h1>
      <Visualiser suspense="true" AudioPlay={playAudio} />
      <div className="row align-items-center justify-content-center">
        <div className="col-md-4">
          <div className="input-group">
            <input
              type="file"
              className="form-select"
              onChange={(e) => setAud(e.target.files[0])}
            ></input>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => setPlayAudio(!playAudio)}
            >
              {playAudio ? "Stop" : "Play"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
