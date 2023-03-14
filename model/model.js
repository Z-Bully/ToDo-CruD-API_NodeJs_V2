let todos = require('../data/Todos')
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils')

function findalltodos() {
  return new Promise((resolve, reject) => {
    resolve(todos)
  })
}
function findtodobyid(id) {
  return new Promise((resolve, reject) => {
    singletodo = todos.find((s) => s.id === id)
    resolve(singletodo)
  })
}
function create(todo) {
  return new Promise((resolve, reject) => {
    const newtodo = { id: Date.now(), ...todo } // Date.now() returns the number of milliseconds ellapsed since the 1st January 1970

    // const newtodo = { id: uuidv4(), ...todo }
    todos.push(newtodo)
    writeDataToFile('./data/Todos.json', todos)
    resolve(newtodo)
  })
}
function update(id, todoData) {
  return new Promise((resolve, reject) => {
    const index = todos.findIndex((p) => p.id === id)
    todos[index] = { id, ...todoData }
    writeDataToFile('./Todos.json', todos)
    resolve(todos[index])
  })
}
function remove(id) {
  return new Promise((resolve, reject) => {
    todos = todos.filter((p) => p.id !== id)
    writeDataToFile('./data/todos.json', todos)
    resolve()
  })
}
module.exports = {
  findtodobyid,
  findalltodos,
  create,
  update,
  remove,
}
