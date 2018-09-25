const arr = [1, 2, 3, 4, 5]

const [,,, four] = arr

const one = arr[0],
      two = arr[1]

console.log(four)


const animal = {
  name: 'rover',
  type: 'dog'
}

// const name = animal.name
// const type = animal.type

const { name: anotherName, type } = animal
console.log(anotherNames, type)


function greet(name, options) {
  const { salutation="default" } = options || {}
}

