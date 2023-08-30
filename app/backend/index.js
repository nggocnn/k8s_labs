const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()

let db = mysql.createConnection({
  port: process.env.DB_PORT,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
})

db.connect((err) => {
  if (err) {
    console.log('Database Connection Failed !!!')
    throw err
  } else {
    console.log('Connected to Database')
  }
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  db.query('SELECT * FROM Contacts', (err, rows) => {
    if (err) {
      res.json({
        success: false,
        err,
      })
    } else {
      res.json({
        success: true,
        rows,
      })
    }
  })
})

app.get('/api/get', (req, res) => {
  const sqlGet = 'SELECT * from Contacts'
  db.query(sqlGet, (err, result) => {
    res.send(result)
  })
})

app.post('/api/post', (req, res) => {
  const { name, email, contact } = req.body
  const sqlInsert = 'INSERT INTO Contacts(name, email, contact) VALUES(?,?,?)'
  db.query(sqlInsert, [name, email, contact], (error, result) => {
    if (error) console.log(error)
  })
})

app.delete('/api/remove/:id', (req, res) => {
  const { id } = req.params
  const sqlRemove = 'DELETE FROM Contacts WHERE id=?'
  db.query(sqlRemove, id, (error, result) => {
    if (error) console.log(error)
  })
})

app.get('/api/get/:id', (req, res) => {
  const { id } = req.params
  const sqlGet = 'SELECT * from Contacts WHERE id = ?'
  db.query(sqlGet, id, (err, result) => {
    if (err) console.log(err)
    res.send(result)
  })
})

app.put('/api/update/:id', (req, res) => {
  const { id } = req.params
  const { name, email, contact } = req.body
  const sqlUpdate =
    'UPDATE Contacts SET name= ?, email= ?, contact= ? WHERE id=?'
  db.query(sqlUpdate, [name, email, contact, id], (err, result) => {
    if (err) console.log(err)
    res.send(result)
  })
})

app.listen(process.env.BACKEND_PORT, () =>
  console.log(`Listening on port ${process.env.BACKEND_PORT}`)
)
