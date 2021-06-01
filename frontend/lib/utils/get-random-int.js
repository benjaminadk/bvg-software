const ints = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function getRandomInt() {
  return ints[Math.floor(Math.random() * 9)]
}

export default getRandomInt
