import React from 'react';
import PropTypes from 'prop-types';
import { StatePropType } from '../reducer';
export const GameSelection = (props) => {
  const { dispatch } = props;
  const handleClick = (gameName) => () => dispatch({ type: 'GAME_SELECT', name: gameName });
  return (
    <div>
      Game Selection Page
      <li>
        <button onClick={handleClick('count-up')}>Count-up</button>
      </li>
      <li>
        <button onClick={handleClick('01')}>01</button>
      </li>
      <li>
        <button onClick={handleClick('cricket')}>Cricket</button>
      </li>
      <li>
        <button onClick={handleClick('eagles-eye')}>Eagles Eye</button>
      </li>
    </div>
  );
};

GameSelection.propTypes = {
  state: StatePropType.isRequired,
  dispatch: PropTypes.func.isRequired,
};
