import { scores } from '../constants/config'

export const hasValidScores = (match) => {
  const uniquePlacements = Array.from(new Set(match.map(player => player.place)))
  const requiredPlaces = [...Array(match.length).keys()].map(x => (x + 1).toString())

  return requiredPlaces.every(place => uniquePlacements.includes(place)) && !uniquePlacements.includes(undefined)
}

export const getPlayersWithUpdatedScores = (players, placements) => {
  const playersWithUpdatedScores = []
  placements.forEach(placement => {
    const currentPlayer = players.find(player => player.name === placement.name)
    currentPlayer.score = currentPlayer.score + scores[placement.place]
    playersWithUpdatedScores.push(currentPlayer)
  })
  return playersWithUpdatedScores
}
