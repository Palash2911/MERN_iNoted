const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();

const app = express()
// because react app will run on 3000
const port = 5000

app.use(cors())
app.use(express.json())

// Using available Routes here
app.use('/api/authen', require('./routes/authen'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNoted listening on http://localhost:${port}`)
})
