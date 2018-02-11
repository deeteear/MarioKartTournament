import { minimalPlayers } from '../constants/config'

export const addPlayer = (name) => {
  return {
    type: 'ADD_PLAYER',
    name,
  }
}

export const deletePlayers = (names) => {
  return {
    type: 'DELETE_PLAYERS',
    names,
  }
}

export const startGame = (numberOfPlayers) => {
  if (numberOfPlayers < minimalPlayers){
    return {
      type: 'NOT_ENOUGH_PLAYERS',
    }
  }
  return {
    type: 'START_GAME',
  }
}

export const startRound = () => {
  return {
    type: 'START_ROUND',
  }
}

export const startKo = () => {
  return {
    type: 'START_KO_ROUND',
  }
}
