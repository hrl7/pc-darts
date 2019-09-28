export const initialState = {
  flights: 0,
  round: 1,
  score: 0,
  history: [],
  averagePerRound: 0,
  averageHistory: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'hit': {
      const { flights, score } = state;
      if (flights >= 3) {
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
