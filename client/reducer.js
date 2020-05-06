import PropTypes from 'prop-types';

export const MODE = {
  GAME_SELECTION: 'GAME_SELECTION',
  PLAYERS_SELECTION: 'PLAYERS_SELECTION',
  PLAYING: 'PLAYING',
  FINISH: 'FINISH',
};

export const GAME_MODE = {
  COUNT_UP: "count-up",
  EAGLES_EYE: 'eagles-eye'
}

export const initialState = {
  flights: 0,
  round: 1,
  score: 0,
  history: [],
  roundHistory: [],
  averagePerRound: 0,
  averageHistory: [],
  mode: MODE.GAME_SELECTION,
  turnIndex: 0,
  players: [],
  game: null,
};

export const StatePropType = PropTypes.shape({
  flights: PropTypes.number.isRequired,
  round: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
  mode: PropTypes.oneOf(Object.keys(MODE)).isRequired,
  turnIndex: PropTypes.number.isRequired,
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
});

const initPlayer = (_, index) => {
  return {
    id: index + 1,
    flights: 0,
    round: 1,
    score: 0,
    roundHistory: [],
    history: [],
    averagePerRound: 0,
    averageHistory: [],
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'hit': {
      if (state.mode != MODE.PLAYING) return state;
      const { flights, score, roundHistory } = state;
      if (flights >= 3) {
        return state;
      }
      switch (action.result) {
        case 'SB':
        case 'DB':
          return {
            ...state,
            flights: flights + 1,
            score: score + 50,
            roundHistory: roundHistory.concat(action.result),
          };
        default:
          const [target, times] = action.result.split('-').map(Number);
          //console.log(`${target} x ${times}`);
          return {
            ...state,
            flights: flights + 1,
            score: score + target * times,
            roundHistory: roundHistory.concat(action.result),
          };
      }
    }
    case 'change': {
      if (state.mode != MODE.PLAYING) return state;
      if (state.round === 8) return { ...state, mode: MODE.FINISH };
      const { round, score, roundHistory } = state;
      return { ...state, flights: 0, round: round + 1, averagePerRound: score / round, roundHistory: [] };
    }
    case 'reset':
      if (state.mode === MODE.FINISH)
        return { ...initialState, game: state.game, players: state.players, mode: MODE.PLAYING };
      if (state.mode != MODE.PLAYING) return state;
      return initialState;
    case 'GO_TO_TOP':
      return initialState;
    case 'RETRY_GAME':
      return { ...initialState, game: state.game, players: state.players, mode: MODE.PLAYING };
    case 'GAME_SELECT':
      return { ...state, mode: MODE.PLAYERS_SELECTION, game: action.name };
    case 'PLAYERS_SELECT':
      return { ...state, mode: MODE.PLAYING, players: [...new Array(action.players)].map(initPlayer) };
    default:
      //console.error('got unknown action: ', action);
      return state;
  }
};
