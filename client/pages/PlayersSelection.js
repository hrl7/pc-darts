import React from 'react';

export const PlayersSelection = (props) => {
  const { dispatch } = props;
  const handleClick = (players) => () => dispatch({ type: 'PLAYERS_SELECT', players });
  return (
    <div>
      Players Selection Page
      <ul>
        <li>
          <button onClick={handleClick(1)}>1</button>
        </li>
        <li>
          <button onClick={handleClick(2)}>2</button>
        </li>
        <li>
          <button onClick={handleClick(3)}>3</button>
        </li>
        <li>
          <button onClick={handleClick(4)}>4</button>
        </li>
      </ul>
    </div>
  );
};
