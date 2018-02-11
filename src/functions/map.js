import Maps from '../constants/maps'

export const getNextMap = (currentMap) => {
  return currentMap ? ((currentMap) % 16) + 1 : 1
}

export const getMapName = (map) => {
  return Maps[map]
}
