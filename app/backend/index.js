const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()
const port = process.env.BACKEND_PORT || 3000

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
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

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
  })
})

app.get('/api/get', async (req, res, next) => {
  try {
    const sqlGet = 'SELECT * FROM Contacts'
    const [result] = await db.promise().query(sqlGet)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

app.post('/api/post', async (req, res, next) => {
  try {
    const { name, email, contact } = req.body
    const sqlInsert = 'INSERT INTO Contacts(name, email, contact) VALUES(?,?,?)'
    await db.promise().query(sqlInsert, [name, email, contact])
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})

app.delete('/api/remove/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const sqlRemove = 'DELETE FROM Contacts WHERE id=?'
    await db.promise().query(sqlRemove, id)
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})

app.get('/api/get/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const sqlGet = 'SELECT * FROM Contacts WHERE id = ?'
    const [result] = await db.promise().query(sqlGet, id)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

app.put('/api/update/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, email, contact } = req.body
    const sqlUpdate =
      'UPDATE Contacts SET name=?, email=?, contact=? WHERE id=?'
    await db.promise().query(sqlUpdate, [name, email, contact, id])
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
