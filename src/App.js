import React, { useState, useEffect } from 'react';
import './App.css';
import Heater1 from "./components/Heater1.mp3"
import Heater2 from "./components/Heater2.mp3"
import Heater3 from "./components/Heater3.mp3"
import Heater4 from "./components/Heater4.mp3"
import Heater6 from "./components/Heater6.mp3"
import Dsc_Oh from "./components/Dsc_Oh.mp3"
import Kick_n_Hat from "./components/Heater2.mp3"
import RP4_KICK_1 from "./components/Heater2.mp3"
import Cev_H2 from "./components/Heater2.mp3"

const audioFiles = {
  Q: {
    name: 'Heater-1',
    path: Heater1,
  },
  W: {
    name: 'Heater-2',
    path: Heater2,
  },
  E: {
    name: 'Heater-3',
    path: Heater3,
  },
  A: {
    name: 'Heater-4',
    path: Heater4,
  },
  S: {
    name: 'Clap',
    path: Heater6,
  },
  D: {
    name: 'Open-HH',
    path: Dsc_Oh,
  },
  Z: {
    name: 'Kick-n-Hat',
    path: Kick_n_Hat,
  },
  X: {
    name: 'Kick',
    path: RP4_KICK_1,
  },
  C: {
    name: 'Closed-HH',
    path: Cev_H2,
  },
};

function App() {
  const [activeKey, setActiveKey] = useState(null);
  const [displayText, setDisplayText] = useState('Press a key or click a button');

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase();
      if (audioFiles[key]) {
        setActiveKey(key);
        setDisplayText(`${key}: ${audioFiles[key].name}`);
        playAudio(key);
      }
    };

    const handleKeyUp = () => {
      setActiveKey(null);
      setTimeout(() => {
        setDisplayText("Press a key or click a button")
      }, 2500)
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const playAudio = (key) => {
    const audio = new Audio(audioFiles[key].path);
    audio.play();
  };

  const handleButtonClick = (key) => {
    setActiveKey(key);
    setDisplayText(`${key}: ${audioFiles[key].name}`);
    playAudio(key);
  };

  return (
    <div className="drum-machine" id="drum-machine">
      <div className="display" id="display">
        <p className="display-text">{displayText}</p>
      </div>
      <div className="drum-pads" id="drumpads">
        {Object.keys(audioFiles).map((key) => (
          <div className="drum-pad-wrapper" key={key}>
            <div className={`drum-pad ${activeKey === key ? 'active' : ''}`} id={key}>
              <button className="button" onClick={() => handleButtonClick(key)}>
                {key}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;