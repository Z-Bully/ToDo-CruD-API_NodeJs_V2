const todos = require('../data/Todos')

function findtodobyid(id) {
  return new Promise((resolve, reject) => {
    singletodo = todos.find((s) => s.id === id)
    resolve(singletodo)
  })
}
module.exports = {
  findtodobyid,
}
