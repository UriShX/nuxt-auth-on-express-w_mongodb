const config = require('../config/auth.config')
const consola = require('consola')
const db = require('../models')
const User = db.user
const Role = db.role

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.')
}

exports.userBoard = (req, res) => {
  console.log(req.userId)
  User.findOne({
    // username: req.body.username
    _id: req.userId
  })
    .populate('roles', '-__v')
    .exec((err, user) => {
      // console.log(user)
      if (err) {
        res.status(500).send({ message: err })
        return
      }
      res.status(200).send({
        username: user.username,
        email: user.email
      })
    })

  // res.status(200).send("User Content.");
}

exports.adminBoard = async (req, res) => {
  res.status(200).send('Admin Content.')
}

exports.moderatorBoard = (req, res) => {
  res.status(200).send('Moderator Content.')
}
