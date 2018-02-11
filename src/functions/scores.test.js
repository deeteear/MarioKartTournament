import { hasValidScores, getPlayersWithUpdatedScores } from './scores'
import { scores } from '../constants/config'

describe('hasValidScores', () => {
  it('should be false if there are 2 placements with same place', () => {
    const match = [
      { place: '1' },
      { place: '1' },
    ]
    expect(hasValidScores(match)).toBe(false)
  })

  it('should be false if there is a placement without place', () => {
    const match = [
      { place: '1' },
      { place: undefined },
    ]
    expect(hasValidScores(match)).toBe(false)
  })

  it('should be true if all placements are different', () => {
    const match = [
      { place: '1' },
      { place: '2' },
    ]
    expect(hasValidScores(match)).toBe(true)
  })

  it('should be true if placements are not numbers from 1 till n', () => {
    const match = [
      { place: '1' },
      { place: '4' },
    ]
    expect(hasValidScores(match)).toBe(false)
  })
})

describe('getPlayersWithUpdatedScores', () => {
  const players = [
    { name: 'adam', score: 0 },
    { name: 'bert', score: 9 },
  ]
  const placements = [
    { name: 'bert', place: 2 },
    { name: 'adam', place: 1 },
  ]
  const playersWithUpdatedScores = getPlayersWithUpdatedScores(players, placements)
  
  it('should return an array with all players', () => {
    expect(playersWithUpdatedScores.length).toBe(players.length)
    expect(players.every(player => playersWithUpdatedScores.includes(player))).toBe(true)
  })

  it('should increase players score with the correct amount', () => {
    expect(playersWithUpdatedScores.find(player => player.name === 'adam').score).toBe(0 + scores[1])
    expect(playersWithUpdatedScores.find(player => player.name === 'bert').score).toBe(9 + scores[2])
  })
})
