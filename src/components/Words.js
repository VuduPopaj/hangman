import React from "react";

const Words = ({ randomWords, correctLetters }) => {
  return (
    <div className="word">
      {randomWords.split("").map((letter, i) => {
        if (letter === " ") {
          return (
            <span
              className="letter"
              key={i}
              style={{ borderBottom: "3px solid white" }}
            >
              {correctLetters.includes(letter) ? letter : ""}
            </span>
          );
        } else {
          return (
            <span
              className="letter"
              key={i}
              style={{ borderBottom: "3px solid white" }}
            >
              {correctLetters.includes(letter) ? letter : ""}
            </span>
          );
        }
      })}
    </div>
  );
};

export default Words;
