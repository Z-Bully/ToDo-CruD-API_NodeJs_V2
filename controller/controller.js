const { findtodobyid } = require('../model/model')
const todos = require('../data/Todos')
function gettodos(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(todos))
}

async function getatodo(req, res, id) {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  let singletodo = await findtodobyid(id)
  res.end(JSON.stringify(singletodo))
}
module.exports = {
  gettodos,
  getatodo,
}
