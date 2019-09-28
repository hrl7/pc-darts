import React, {useReducer, useEffect} from "react";
import PropTypes from 'prop-types';
import {reducer, initialState} from './reducer';

export const App = ({dartsBoardEvent}) => {
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

App.propTypes = {
  dartsBoardEvent: PropTypes.shape({
    on: PropTypes.func.isRequired,
    off: PropTypes.func.isRequired,
  }).isRequired
};