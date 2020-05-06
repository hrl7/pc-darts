import React, { useState, useEffect } from 'react';
import hitSound from '../../assets/dart-thrown.wav';
import buzzerSound from '../../assets/buzzer.wav';
import startSound from '../../assets/start.wav';

const hitAudio = new Audio(hitSound);
const buzzerAudio = new Audio(buzzerSound);
const startAudio = new Audio(startSound);

const playSound = (score, result) => {
  if (!score) return null;
  if (result === 'SB' || result === 'DB') {
    hitAudio.play();
  } else if (result !== 'up' || result !== 'down' || result !== 'change' || result !== 'reset') {
    buzzerAudio.play();
  }
};

export const EaglesEye = (props) => {
  const { state } = props;
  const { result, score } = state;

  playSound(score, result);

  useEffect(() => {
    startAudio.play();
  }, []);

  return (
    <div>
      <h1>Eagles Eye</h1>
      <h1>Score: {state.score}</h1>
      <h1>Round: {state.round}</h1>
      <ul>
        {state.roundHistory.map((score, i) => (
          <li key={`${i}-${score}`}>{score}</li>
        ))}
      </ul>
    </div>
  );
};
