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
    //origin: "http://localhost:4200",
    //edit address
    origin: "http://54.84.200.3:4200",
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(bodyParser.json());
app.use(cors({
  //origin: "http://localhost:4200",
  //edit address
  origin: "http://54.84.200.3:4200",
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

  //const command = `curl -X POST http://3.224.6.184:8091/query -H "Content-Type: application/json" -d '{"query_str": "${prompt}"}' `;
  const command = prompt;
  //if in json form you have to use ` instead of '
  /*const command = `curl -X POST http://44.223.200.55:7869/api/generate -d '{
    "model": "gemma2:2b",
>>>>>>> selectexperimental
    "prompt": "${prompt}",
    "stream": false,
    "context_length": 1024,
    "Temperature": 0.2,
    "stop": [""],
    "top_p": 0.95,
    "verbose": false,
    "repetition_penalty": 1.25,
    "do_sample": true
  }' | jq '. | {response, created_at}'`;*/
  
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
server.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});

