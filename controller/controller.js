const {
  findtodobyid,
  findalltodos,
  create,
  update,
  remove,
} = require('../model/model')

async function gettodos(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  const todos = await findalltodos()
  res.end(JSON.stringify(todos))
}

async function getatodo(req, res, id) {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  let singletodo = await findtodobyid(id)
  res.end(JSON.stringify(singletodo))
}

async function createatodo(req, res) {
  let body = ''

  req.on('data', (chunk) => {
    body += chunk.toString()
  })

  req.on('end', async () => {
    const { title, completed = false } = JSON.parse(body)
    const todo = {
      title,
      completed,
    }
    const newtodo = await create(todo)
    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(newtodo))
    // return res.end(JSON.stringify(newtodo))
  })
}
async function updateatodo(req, res, id) {
  const todo = await findtodobyid(id)
  if (!todo) {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify('todo  not found'))
  } else {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
    })
    req.on('end', async () => {
      const { title, completed } = JSON.parse(body)
      const todoData = {
        title: title || todo.title,
        completed: completed || todo.completed,
      }
      const updtodo = await update(id, todoData)
      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(updtodo))
    })
  }
}

async function deleteatodo(req, res, id) {
  try {
    // if todo doesn't exist
    const todo = await findtodobyid(id)
    if (!todo) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'todo not found' }))
    } else {
      await remove(id)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'todo' + id + 'removed' }))
    }
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  gettodos,
  getatodo,
  createatodo,
  updateatodo,
  deleteatodo,
}
