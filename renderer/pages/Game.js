import React from "react";

export const Game = (props) => {
  const  { state } = props;
  return (<div>Game Page
    <div>
      <h1>Score: {state.score}</h1>
      <h1>Round: {state.round}</h1>
    </div>
  </div>)
}