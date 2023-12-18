




const express = require('express');
const app = express();
const port = 3000;

// Middleware
const formMiddleware = require('./middleWare');
app.use(express.urlencoded({ extended: true })); // Built-in middleware

// Routes
const usersRouter = require('./users');
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the homepage');
});


// Listen
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
