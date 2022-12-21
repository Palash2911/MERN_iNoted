const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
require('dotenv').config();

connectToMongo();

const app = express()
// because react app will run on 8000
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())

// Using available Routes here
app.use('/api/authen', require('./routes/authen'))
app.use('/api/notes', require('./routes/notes'))

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.render('error');
});

app.listen(port, () => {
  console.log(`iNoted listening on http://localhost:${port}`)
})
