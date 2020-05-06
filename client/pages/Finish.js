import React from 'react';
import { StatePropType } from '../reducer';
import PropTypes from 'prop-types';

export const Finish = (props) => {
  const { state, dispatch } = props;
  return (
    <div>
      Finish
      <div>
        <h1>Result</h1>
        <h2>Score: {state.score}</h2>
        <h2>Round: {state.round}</h2>
        <button onClick={() => dispatch({ type: 'GO_TO_TOP' })}>home</button>
        <button onClick={() => dispatch({ type: 'RETRY_GAME' })}>again</button>
      </div>
    </div>
  );
};

Finish.propTypes = {
  state: StatePropType.isRequired,
  dispatch: PropTypes.func.isRequired,
};
