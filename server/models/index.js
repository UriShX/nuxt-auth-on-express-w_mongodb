const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose

db.URI = process.env.MONGO_URI || require('../config/keys').mongoURI

db.user = require('./user.model')
db.role = require('./role.model')

db.ROLES = ['user', 'admin', 'moderator']

module.exports = db
