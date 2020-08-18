const express = require('express')

const cors = require('cors')
const path = require('path')
const { app, server } = require('./socket')

app.use(express.json({ extended: true }))
app.use(cors())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(express.static(__dirname));
app.use('/bot', require('./routes/bot.routes'))
// app.use('/posts', require('./routes/post.routes'))
// app.use('/chat', require('./routes/chat.routes'))
// app.use('/upload', require('./routes/upload.routes'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
  })
}

const PORT = 3000

async function start() {
  try {
    server.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

start()
