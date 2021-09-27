/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Figure from "./components/Figure";
import Words from "./components/Words";
import IncorrectLetters from "./components/IncorrectLetters";
import Popup from "./components/Popup";
import Notifications from "./components/Notifications";
import { showNotification as show } from "./helpers/helpers";
import themoviedb from "./api/themoviedb";

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([" "]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [randomWords, setRandomWords] = useState("Error");
  const [color, setColor] = useState("white");

  // console.log(randomWords);
  useEffect(() => {
    wordSearch();
  }, []);

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toUpperCase();
        // console.log(correctLetters);
        if (randomWords.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable, randomWords]);

  function playAgain() {
    setPlayable(true);
    setCorrectLetters([" "]);
    setWrongLetters([]);
    wordSearch();
  }
  const wordSearch = () => {
    if (randomWords === "Error") {
      onSearch();
    } else onSearch();
  };
  const keyword = Math.floor(Math.random() * 700) + 100;

  const onSearch = async () => {
    const response = await themoviedb.get(`${keyword}`);
    setRandomWords(
      response.data.title
        .toUpperCase()
        .replace(/[&/\\#,+()$~%.'":*?<>{}!0-9 ]/g, " ")
    );
  };

  return (
    <>
      <h1>Hangman</h1>
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <IncorrectLetters wrongLetters={wrongLetters} />
        <Words
          randomWords={randomWords}
          correctLetters={correctLetters}
          color={color}
          setColor={setColor}
        />
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        randomWords={randomWords}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notifications showNotification={showNotification} />
    </>
  );
}

export default App;
