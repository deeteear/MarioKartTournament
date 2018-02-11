import Maps from '../constants/maps'
import { getMapName, getNextMap } from './map'

describe('getNextMap', () => {
  it('should return the first map if current map was undefined', () => {
    expect(getNextMap(undefined)).toBe(1)
  })
  it('should return the first map if current map was the last map', () => {
    expect(getNextMap(16)).toBe(1)
  })
  it('should return the 2nd map if current map was the first map', () => {
    expect(getNextMap(1)).toBe(2)
  })
})

describe('getMapName', () => {
  it('should return the correct mapname', () => {
    Object.keys(Maps).forEach((mapNumber) => {
      expect(getMapName(mapNumber)).toBe(Maps[mapNumber])
    })
  })
})
