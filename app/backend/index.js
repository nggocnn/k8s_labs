const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { Sequelize, DataTypes } = require('sequelize')

const app = express()

const port = process.env.BACKEND_PORT || 5000

const readDatabases = JSON.parse(process.env.READ_DATABASES)
const writeDatabase = JSON.parse(process.env.WRITE_DATABASE)

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, null, null, {
  dialect: 'mysql',
  port: process.env.MYSQL_PORT,
  replication: {
    read: [
      {
        host: 'database',
        username: 'root',
        password: 'password',
      },
    ],
    write: {
      host: 'database',
      username: 'root',
      password: 'password',
    },
  },
  pool: {
    max: parseInt(process.env.DB_POOL_MAX),
    idle: parseInt(process.env.DB_POOL_IDLE),
  },
})

const Contact = sequelize.define(
  'Contact',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Contacts',
    timestamps: false,
  }
)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to Database')
  })
  .catch((err) => {
    console.log('Database Connection Failed !!!', err)
    throw err
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
    const contacts = await Contact.findAll()
    res.json(contacts)
  } catch (err) {
    next(err)
  }
})

app.post('/api/post', async (req, res, next) => {
  try {
    const { name, email, contact } = req.body
    await Contact.create({ name, email, contact })
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})

app.delete('/api/remove/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    await Contact.destroy({ where: { id } })
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})

app.get('/api/get/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const contact = await Contact.findByPk(id)
    res.json(contact)
  } catch (err) {
    next(err)
  }
})

app.put('/api/update/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, email, contact } = req.body
    await Contact.update({ name, email, contact }, { where: { id } })
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
