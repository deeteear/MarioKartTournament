import Pages from '../constants/pages'
import { shuffleArray, generateMatches } from '../functions'

const defaultState = {
  players: [],
  currentPage: Pages.ADD_PLAYER,
  currentRound: {},
}
// TODO add potentially missing actions
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, currentPage: Pages.SCORE }
    case 'ADD_PLAYER': {
      const newPlayers = [...state.players]
      newPlayers.push({ name: action.name, score: 0 })
      return { ...state, players: newPlayers }
    }
    case 'DELETE_PLAYERS': {
      const newPlayers = []
      state.players.forEach((player) => {
        if (!action.names.includes(player.name)){
          newPlayers.push(player)
        }
      })
      return { ...state, players: newPlayers }
    }
    case 'START_ROUND':{
      const randomizedPlayers = shuffleArray([...state.players])
      const nextRound = {
        matches: generateMatches(randomizedPlayers),
        map: state.currentRound.map ? ((state.currentRound.map + 1) % 16) + 1 : 1,
      }
      return { ...state, currentRound: nextRound, currentPage: Pages.ROUND }
    }
    case 'SUBMIT_SCORE':// TODO implement me
      return state
    case 'ROUND_END':
    // TODO implement me
    // TODO add score and sort players
      return state
    case 'START_KO_ROUND':{
      const nextRound = {
        matches: generateMatches([...state.players]),
        map: 1,
      }
      return { ...state, currentRound: nextRound, currentPage: Pages.ROUND }
    }
    case '@@INIT':{ // TODO remove me!
      return { ...state, currentPage: Pages.ADD_PLAYER }
    }
    default:
      return state
  }
}
