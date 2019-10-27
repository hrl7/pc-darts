import React from "react";

export const Game = (props) => {
  const  { state } = props;
  return (<div>
    <div>
      <h1>Score: {state.score}</h1>
      <h1>Round: {state.round}</h1>
      <ul>{state.roundHistory.map((score,i) => <li id={`${i}-${score}`}>{score}</li>)}</ul>
    </div>
  </div>)
}