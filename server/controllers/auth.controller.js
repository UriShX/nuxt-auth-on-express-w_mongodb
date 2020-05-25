const config = require('../config/auth.config')
const db = require('../models')
const User = db.user
const Role = db.role

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

const accessTokenExpiresIn = '20m'

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err })
            return
          }

          user.roles = roles.map((role) => role._id)
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err })
              return
            }

            res.send({ message: 'User was registered successfully!' })
          })
        }
      )
    } else {
      Role.findOne({ name: 'user' }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err })
          return
        }

        user.roles = [role._id]
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err })
            return
          }

          res.send({ message: 'User was registered successfully!' })
        })
      })
    }
  })
}

exports.signin = (req, res) => {
  User.findOne({
    // username: req.body.username
    email: req.body.email
  })
    .populate('roles', '-__v')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }

      if (!user) {
        return res.status(404).send({ message: 'User Not found.' })
      }

      // console.log(user)

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!'
        })
      }

      const accessToken = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: accessTokenExpiresIn
      })
      const refreshToken = jwt.sign(
        { id: user.id },
        config.refreshTokenSecret,
        {
          expiresIn: 86400 // 24 hours
        }
      )

      config.refreshTokens.push(refreshToken)

      res.status(200).send({
        accessToken,
        refreshToken
      })
    })
}

exports.refresh = (req, res) => {
  console.log('refreshing token')

  // const { token } = req.body
  let refreshToken = req.cookies['auth._refresh_token.local']

  if (!refreshToken) {
    return res.sendStatus(401)
  }

  if (!config.refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403)
  }

  jwt.verify(refreshToken, config.refreshTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403)
    }

    const accessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: accessTokenExpiresIn
    })

    res.json({
      accessToken,
      refreshToken
    })
  })
}
