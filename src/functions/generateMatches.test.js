import generateMatches from './generateMatches'
import { maxMatchSize } from '../constants/config'

const createPlayers = (numberOfPlayers) => {
  return [...Array(numberOfPlayers).keys()].map(x => ({ name: `player_${x + 1}` }))
}


for (let i = 1; i < maxMatchSize * 4; i++) {
  const players = createPlayers(i)
  const matches = generateMatches(players)
  matches.forEach((match) => {
    match.forEach((player, index) => {
      it(`should assign controller ${index + 1} to player ${index + 1}`, () => {
        expect(player.controller).toBe(index + 1)
      })
    })
  })

  const uniqueMatchSizes = matches.map(match => match.length).filter((value, index, self) => self.indexOf(value) === index)
  it('should generate matches with sizes that differ at most by 1', () => {
    expect(uniqueMatchSizes.length).toBeLessThanOrEqual(2)
    if (uniqueMatchSizes.length === 2){
      expect(Math.abs(uniqueMatchSizes[0] - uniqueMatchSizes[1])).toBe(1)
    }
  })

  it(`should not create matches with more than ${maxMatchSize} players`, () => {
    uniqueMatchSizes.forEach(matchSize => {
      expect(matchSize).toBeLessThanOrEqual(maxMatchSize)
    })
  })

  const uniquePlayernames = [].concat.apply([], matches)
    .map(player => player.name)
    .filter((value, index, self) => self.indexOf(value) === index)
  it('should put each player into exactly one match', () => {
    expect(uniquePlayernames.length).toBe(players.length)
    players.forEach(player => {
      expect(uniquePlayernames.includes(player.name)).toBe(true)
    })

  })
}
