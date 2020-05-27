const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const url = require('url')
const q =
  typeof process.env.BASE_URL === 'string'
    ? url.parse(process.env.BASE_URL, true)
    : null
console.log(q)

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const router = express.Router()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'
config.axios.baseURL =
  q !== null
    ? `${q.protocol}//${q.host}:${process.env.PORT}/api`
    : 'http://localhost:3000/api'

console.log(config.axios)

// DB Config
const db = require('./models')
const Role = db.role
const URI = db.URI

// Connect to MongoDB
db.mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB Connected')
    initial()
  })
  .then(() => {
    db.mongoose.connection.db.listCollections().toArray(function(err, names) {
      if (err) {
        console.log(err)
      } else {
        names.forEach(function(e, i, a) {
          // mongoose.connection.db.dropCollection(e.name);
          console.log('--->>', e.name)
        })
      }
    })
  })
  .catch((err) => {
    console.log(err)
    process.exit()
  })

// Initialize database
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'user'
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'user' to roles collection")
      })

      new Role({
        name: 'moderator'
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'moderator' to roles collection")
      })

      new Role({
        name: 'admin'
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'admin' to roles collection")
      })
    }
  })
}

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// routes
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
