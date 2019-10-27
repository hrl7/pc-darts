import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { reducer, initialState, MODE } from './reducer';
import { Game } from './pages/Game';
import { GameSelection } from './pages/GameSelection';
import { PlayersSelection } from './pages/PlayersSelection';
import { Finish } from './pages/Finish';

const PAGES = {
  Game: Game,
  GameSelection: GameSelection,
  PlayersSelection: PlayersSelection,
  Finish: Finish,
};

export const App = ({ dartsBoardEvent }) => {
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

  let Page;
  switch (state.mode) {
    case MODE.PLAYING:
      Page = PAGES.Game;
      break;
    case MODE.GAME_SELECTION:
      Page = PAGES.GameSelection;
      break;
    case MODE.PLAYERS_SELECTION:
      Page = PAGES.PlayersSelection;
      break;
    case MODE.FINISH:
      Page = PAGES.Finish;
      break;
    default:
      console.error('unknown state: ', state.mode);
      Page = PAGES.GameSelection;
  }
  return <Page state={state} dispatch={dispatch} />;
};

App.propTypes = {
  dartsBoardEvent: PropTypes.shape({
    on: PropTypes.func.isRequired,
    off: PropTypes.func.isRequired,
  }).isRequired,
};
