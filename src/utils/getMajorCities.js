export const majorCities = (states) => {
  const reduced = states.reduce((acc, curr) => {
    acc[curr[2]] ? acc[curr[2]]++ : acc[curr[2]] = 1
    return acc
  }, {})

  let sorted = Object.keys(reduced).sort((a, b) => reduced[b] - reduced[a])

  sorted = sorted.slice(0,10)

  return sorted
}