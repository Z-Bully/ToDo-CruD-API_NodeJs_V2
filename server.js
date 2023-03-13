const http = require('http')
// import {} from 'node:fs'
// import {} from 'module'
const todos = require('./data/Todos')

const server = http
  .createServer(async (req, res) => {
    // Display ALL TODOS
    if (req.url.match(/\/api\/todos/) && req.method === 'GET')
      res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(todos))
  })
  .listen(8082)
console.log('Server is Running on port 8082')
