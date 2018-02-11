import { maxMatchSize } from '../constants/config'

const dividePlayersIntoMatches = (players) => {
  const matches = []
  const remainingPlayers = [...players]
  while (remainingPlayers.length > 0){
    matches.push(remainingPlayers.splice(0, maxMatchSize))
  }
  return matches
}

const areMatchSizesBalanced = (matchSizes) => {
  const uniqueMatchSizes = matchSizes.filter((value, index, self) => self.indexOf(value) === index)
  if (uniqueMatchSizes.length === 2){
    return Math.abs(uniqueMatchSizes[0] - uniqueMatchSizes[1]) === 1
  }
  return uniqueMatchSizes.length === 1
}

const balanceMatchSizes = (matches) => {
  let matchSizes = matches.map(match => match.length)
  while (!areMatchSizesBalanced(matchSizes)){
    const smallestMatch = matches[matchSizes.indexOf(Math.min(...matchSizes))]
    const largestMatch = matches[matchSizes.indexOf(Math.max(...matchSizes))]
    smallestMatch.push(largestMatch.pop())
    matchSizes = matches.map(match => match.length)
  }
}

const assignControllersToPlayers = (match) => {
  return match.map((player, index) => ({ controller: index + 1, player: player.name }))
}

export default (players) => {
  const matches = dividePlayersIntoMatches(players)
  balanceMatchSizes(matches)
  return matches.map(assignControllersToPlayers)
}