const express = require('express');
const cors = require('cors');
const tasks = require('./tasks');

const PORT = 3500;
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', function(req, res, next) {
  res.send('Hello world!');
});

app.use('/tasks', tasks);

app.listen(PORT, () => {
  console.log(`Server is up! running in port ${PORT}`);
})

