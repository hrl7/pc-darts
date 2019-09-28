import { ipcRenderer } from 'electron';
import ReactDOM from 'react-dom';
import React, { useReducer, useEffect } from 'react';
import EventEmitter from 'eventemitter3';

ipcRenderer.on('device', console.log);
ipcRenderer.send('ready');

const dartsBoardEvent = new EventEmitter();
ipcRenderer.on('hit', (_, result) => {
  console.log(result);
  if (!result) return;

  if (result === 'reset') {
    dartsBoardEvent.emit('reset');
    return;
  }

  if (result === 'change') {
    dartsBoardEvent.emit('change');
    return;
  }

  dartsBoardEvent.emit('hit', result);

  /*
  const [target, times] = result.split('-').map(Number);
  console.log(`${target} x ${times}`);
   */
});

const initialState = {
  flights: 0,
  round: 1,
  score: 0,
  history: [],
  averagePerRound: 0,
  averageHistory: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'hit': {
      const { flights, score } = state;
      if (flights > 3) {
        return state;
      }
      switch (action.result) {
        case 'SB':
        case 'DB':
          return { ...state, flights: flights + 1, score: score + 50 };
        default:
          const [target, times] = action.result.split('-').map(Number);
          console.log(`${target} x ${times}`);
          return { ...state, flights: flights + 1, score: score + target * times };
      }
    }
    case 'change': {
      const { round } = state;
      return { ...state, flights: 0, round: round + 1};
    }
    case 'reset':
      return initialState;
    default:
      console.error('got unknown action: ', action);
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleChange = () => dispatch({ type: 'change' });
  const handleReset = () => dispatch({ type: 'reset' });
  const handleHit = result => dispatch({ type: 'hit', result });
  useEffect(() => {
    dartsBoardEvent.on('change', handleChange);
    dartsBoardEvent.on('reset', handleReset);
    dartsBoardEvent.on('hit', handleHit);
    return () => {
      dartsBoardEvent.off('change', handleChange);
      dartsBoardEvent.off('reset', handleReset);
      dartsBoardEvent.off('hit', handleHit);
    };
  });

  return (
    <div>
      <h1>Score: {state.score}</h1>
      <h1>Round: {state.round}</h1>
    </div>
  );
};

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('root'));
});
