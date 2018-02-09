export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// TODO refactor
export const generateMatches = (players) => {
  // split into matches of size 4
  const groups = []
  while (players.length > 0){
    groups.push(players.splice(0, 4))
  }
  // if last match has less than 3 players move players from matches with 4 players to last match
  let n = 0
  while (groups[groups.length - 1].length < 3 && n < groups.length - 1){
    const currentGroup = groups[n]
    const lastMember = currentGroup[currentGroup.length - 1]
    currentGroup.splice(currentGroup.length - 1, 1)
    groups[groups.length - 1].push(lastMember)
    n++
  }
  // map array of arrays of players into array of match objects
  return groups.map((group) => {
    if (group.length === 4){
      return [
        { controller: 1, player: group[0].name },
        { controller: 2, player: group[1].name },
        { controller: 3, player: group[2].name },
        { controller: 4, player: group[3].name },
      ]
    }
    return [
      { controller: 1, player: group[0].name },
      { controller: 2, player: group[1].name },
      { controller: 3, player: group[2].name },
    ]
  })
}
