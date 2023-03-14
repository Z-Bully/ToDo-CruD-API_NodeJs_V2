const http = require('http')
// import {} from 'node:fs'
// import {} from 'module'
const todos = require('./data/Todos')
const {
  gettodos,
  getatodo,
  createatodo,
  updateatodo,
  deleteatodo,
} = require('./controller/controller')

const server = http
  .createServer(async (req, res) => {
    // Display ALL TODOS
    if (req.url.match(/^\/api\/todos$/) && req.method === 'GET') {
      gettodos(req, res)
    }
    // Display A Specific Todo
    else if (req.url.match(/^\/api\/todo\/([0-9]+)$/) && req.method === 'GET') {
      let url = req.url.split('/')
      // let id = url[3]
      // console.log(typeof id)
      let id = url.splice(3, 1)
      getatodo(req, res, String(id))
      console.log(typeof id)
      // Splice did not return a number or a string, but rather an array of one variable of type Object
    }
    // Display A Group of Todos
    // Create a Single Todo
    else if (req.url.match(/^\/api\/todos$/) && req.method === 'POST') {
      createatodo(req, res)
    }
    // Update a Single Todo
    else if (req.url.match(/^\/api\/todo\/([0-9]+)$/) && req.method === 'PUT') {
      let url = req.url.split('/')
      let id = url.splice(3, 1)
      updateatodo(req, res, String(id))
    } // Delete a Single Todo
    else if (
      req.url.match(/\/api\/todo\/([0-9]+)/) &&
      req.method === 'DELETE'
    ) {
      const id = req.url.split('/')[3]
      deleteatodo(req, res, id)
    }
    // If nothing Works
    else {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify('Route not Found'))
    }
  })
  .listen(8082)
console.log('Server is Running on port 8082')
