const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const port = 3000;
//connect with angular
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:4200",
  methods: ["GET", "POST"],
  credentials: true
}));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
//prompt upload to model
app.post('/api/generate-content', (req, res) => {
  const prompt = req.body.query_str;
  console.log('Prompt received:', prompt);
  io.emit('prompt received!');

  const command = `curl -X POST http://3.224.6.184:8091/query -H "Content-Type: application/json" -d '{"query_str": "${prompt}"}'`;
  console.log('Executing command:', command);
  io.emit('Executing Command...');
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send(`Error: ${error.message}`);
    }

    if (stderr) {
      console.error(`Stderr: ${stderr}`);
    }

    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    //response
    try {
      const jsonResponse = JSON.parse(stdout);
      io.emit('Answer!')
      io.emit('response', jsonResponse);
      res.json(jsonResponse);
      console.log('response', jsonResponse);
    } catch (e) {
      console.error(`Error parsing response: ${e.message}`);
      res.status(500).send(`Error parsing response: ${e.message}`);
    }
  });
});
//port listen
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

