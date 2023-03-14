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
      res.end(JSON.stringify({ message: 'no todo found to delete' }))
    } else {
      await remove(id)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'todo' + id + 'removed' }))
    }
  } catch (error) {
    console.log(error)
  }
}
async function deleteatodo_multi(req, res, list_ids) {
  let iterations = 0
  for (let index = 0; index < list_ids.length; index++) {
    const todo = await findtodobyid(list_ids[index])
    if (!todo) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'no todo found to delete' }))
    } else {
      await remove(list_ids[index])
      iterations++
      if (list_ids.length === iterations) {
        res.writeHead(200, { 'Content-Type': 'application/json' })

        res.end(
          JSON.stringify({
            message: list_ids.length + ' Todos were removed sucessfully',
          }),
        )
      }
    }
  }
}
module.exports = {
  gettodos,
  getatodo,
  createatodo,
  updateatodo,
  deleteatodo,
  deleteatodo_multi,
}
