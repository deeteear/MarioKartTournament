import Pages from '../constants/pages'
import Messages from '../messages'
import Functions from '../functions'

const defaultState = {
  players: [
    { name: 'alice', score: 0 },
    { name: 'bob', score: 0 },
    { name: 'carol', score: 0 },
    { name: 'dave', score: 0 },
    { name: 'eve', score: 0 },
    { name: 'frank', score: 0 },
    { name: 'grace', score: 0 },
    { name: 'hank', score: 0 },
    { name: 'iris', score: 0 },
    { name: 'judy', score: 0 },
  ],
  currentPage: Pages.ADD_PLAYER,
  currentRound: {},
  errorMessage: undefined,
}
// TODO add potentially missing actions
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, errorMessage: undefined, currentPage: Pages.SCORE }
    case 'ADD_PLAYER': {
      const newPlayers = [...state.players]
      newPlayers.push({ name: action.name, score: 0 })
      return { ...state, errorMessage: undefined, players: newPlayers }
    }
    case 'DELETE_PLAYERS': {
      const newPlayers = []
      state.players.forEach((player) => {
        if (!action.names.includes(player.name)){
          newPlayers.push(player)
        }
      })
      return { ...state, errorMessage: undefined, players: newPlayers }
    }
    case 'START_ROUND':{
      const randomizedPlayers = Functions.shuffleArray([...state.players])
      const nextRound = {
        matches: Functions.generateMatches(randomizedPlayers),
        map: Functions.getNextMap(state.currentRound.map),
      }
      return { ...state, errorMessage: undefined, currentRound: nextRound, currentPage: Pages.ROUND }
    }
    case 'NOT_ENOUGH_PLAYERS': {
      return { ...state, errorMessage: Messages['error.not_enough_players'] }
    }
    case 'INVALID_SCORES': {
      return { ...state, errorMessage: Messages['error.invalid_scores'] }
    }
    case 'SUBMIT_SCORE':{
      return {
        ...state,
        errorMessage: undefined,
        players: Functions.getPlayersWithUpdatedScores(state.players, action.placements),
        currentPage: Pages.SCORE,
      }
    }
    case 'START_KO_ROUND':{
      // TODO implement a ko-round component
      const nextRound = {
        matches: Functions.generateMatches([...state.players]),
        map: 1,
      }
      return { ...state, errorMessage: undefined, currentRound: nextRound, currentPage: Pages.ROUND }
    }
    case '@@INIT':{ // TODO remove me!
      return { ...defaultState, errorMessage: undefined, players: [...state.players] }
    }
    default:
      return state
  }
}
