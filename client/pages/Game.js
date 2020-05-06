import React, { useState } from 'react';
import sound from '../../assets/dart-thrown.wav';

const audio = new Audio(sound);
export const Game = (props) => {
  const { state } = props;
  const [score, setScore] = useState(0);
  if (state.score !== score) {
    setScore(state.score);
    audio.play();
  }

  return (
    <div>
      <div>
        <h1>Score: {state.score}</h1>
        <h1>Round: {state.round}</h1>
        <ul>
          {state.roundHistory.map((score, i) => (
            <li key={`${i}-${score}`}>{score}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
