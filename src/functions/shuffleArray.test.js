import shuffleArray from './shuffleArray'

it('should still contain all elements', () => {
  const array = ['apple', 'orange', 'mango']
  const shuffledArray = shuffleArray(array)
  array.forEach(element => {
    expect(shuffledArray.includes(element)).toBe(true)
  })
})

it('should still have the same size', () => {
  const array = ['apple', 'orange', 'mango']
  const shuffledArray = shuffleArray(array)
  expect(shuffledArray.length).toBe(3)
})
