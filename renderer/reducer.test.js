import { initialState, MODE, reducer } from './reducer';

it('should be initial state', () => {
  expect(reducer(initialState, { type: 'reset' })).toMatchObject({ round: 1, flights: 0, score: 0 });
});

it('hit and then add score and flights', () => {
  let state = reducer(initialState, { type: 'reset' });
  state.mode = MODE.PLAYING;
  expect(state).toMatchObject({ round: 1, flights: 0, score: 0 });
  state = reducer(state, { type: 'hit', result: '20-3' });
  expect(state).toMatchObject({ score: 60, flights: 1 });
  state = reducer(state, { type: 'hit', result: '20-3' });
  expect(state).toMatchObject({ score: 120, flights: 2 });
  state = reducer(state, { type: 'hit', result: '20-3' });
  expect(state).toMatchObject({ score: 180, flights: 3 });
});

it('prevent adding score if user throws more than 3 without round change', () => {
  let state = reducer(initialState, { type: 'reset' });
  state.mode = MODE.PLAYING;
  expect(state).toMatchObject({ round: 1, flights: 0, score: 0 });
  state = reducer(state, { type: 'hit', result: '20-3' });
  state = reducer(state, { type: 'hit', result: '20-3' });
  state = reducer(state, { type: 'hit', result: '20-3' });
  expect(state).toMatchObject({ score: 180, flights: 3 });

  state = reducer(state, { type: 'hit', result: '20-3' });
  expect(state).toMatchObject({ score: 180, flights: 3, round: 1 });
});

it('increment round and reset flights when round changed', () => {
  let state = reducer(initialState, { type: 'reset' });
  state.mode = MODE.PLAYING;
  expect(state).toMatchObject({ round: 1, flights: 0, score: 0 });
  state = reducer(state, { type: 'hit', result: '20-3' });
  state = reducer(state, { type: 'hit', result: '20-3' });
  state = reducer(state, { type: 'hit', result: '20-3' });
  expect(state).toMatchObject({ score: 180, flights: 3 });
  state = reducer(state, { type: 'change' });

  expect(state).toMatchObject({ score: 180, flights: 0, round: 2 });
});

it('round history', () => {
  let state = reducer(initialState, { type: 'reset' });
  state.mode = MODE.PLAYING;
  expect(state).toMatchObject({ round: 1, flights: 0, score: 0 });
  state = reducer(state, { type: 'hit', result: '20-3' });
  expect(state).toMatchObject({ score: 60, flights: 1, roundHistory: ['20-3'] });
  state = reducer(state, { type: 'hit', result: '20-3' });
  expect(state).toMatchObject({ score: 120, flights: 2, roundHistory: ['20-3', '20-3'] });
  state = reducer(state, { type: 'hit', result: '20-3' });
  expect(state).toMatchObject({ score: 180, flights: 3, roundHistory: ['20-3', '20-3', '20-3'] });
  state = reducer(state, { type: 'change' });

  expect(state).toMatchObject({ score: 180, flights: 0, round: 2, roundHistory: [] });
});

it('reset score, flights and rounds if got reset request', () => {
  let state = reducer(initialState, { type: 'reset' });
  state.mode = MODE.PLAYING;
  expect(state).toMatchObject({ round: 1, flights: 0, score: 0 });
  state = reducer(state, { type: 'hit', result: '20-3' });
  state = reducer(state, { type: 'hit', result: '20-3' });
  state = reducer(state, { type: 'hit', result: '20-3' });
  expect(state).toMatchObject({ score: 180, flights: 3 });
  state = reducer(state, { type: 'change' });
  expect(state).toMatchObject({ score: 180, flights: 0 });
  state = reducer(state, { type: 'hit', result: '20-3' });

  state = reducer(state, { type: 'reset' });
  expect(state).toMatchObject({ score: 0, flights: 0, round: 1 });
});

it('average per round', () => {
  let state = reducer(initialState, { type: 'reset' });
  state.mode = MODE.PLAYING;
  expect(state).toMatchObject({ round: 1, flights: 0, score: 0 });
  state = reducer(state, { type: 'hit', result: '20-3' });
  state = reducer(state, { type: 'hit', result: '20-3' });
  state = reducer(state, { type: 'hit', result: '20-3' });
  expect(state).toMatchObject({ score: 180, flights: 3, averagePerRound: 0 });
  state = reducer(state, { type: 'change' });
  expect(state).toMatchObject({ score: 180, flights: 0, averagePerRound: 180 });
  state = reducer(state, { type: 'hit', result: '20-3' });
  state = reducer(state, { type: 'change' });
  expect(state).toMatchObject({ score: 240, flights: 0, averagePerRound: 120 });

  state = reducer(state, { type: 'reset' });
  expect(state).toMatchObject({ score: 0, flights: 0, round: 1, averagePerRound: 0 });
});

it('init player', () => {
  let state = reducer(initialState, { type: 'reset' });
  expect(state).toMatchObject({ round: 1, flights: 0, score: 0 });
  state = reducer(state, { type: 'PLAYERS_SELECT', players: 3 });
  expect(state.players.length).toBe(3);
  expect(state.players[2]).toMatchObject({
    id: 3,
    flights: 0,
    round: 1,
    score: 0,
    history: [],
    averagePerRound: 0,
    averageHistory: [],
  });
});
