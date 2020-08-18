const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
io.on('connection', socket => {

  socket.on('disconnect', () => {
    console.log(socket)
  })
})

module.exports = {
  app,
  server
}