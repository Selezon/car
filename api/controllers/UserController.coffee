User =
  login: (req, res) ->
    passwordHash = require 'password-hash'
    md5 = require 'MD5'
    hashedPassword = passwordHash.generate 'password123', null, 1
    console.log hashedPassword, md5 "test"
    return
    ###User.findOneByEmail(req.body.email).done (err, user) ->
      if err
        res.json
          error: "DB error"
        , 500
      if user
        bcrypt.compare req.body.password, user.password, (err, match) ->
          if err
            res.json
              error: "Server error"
            , 500
          if match

            # password match
            req.session.user = user.id
            res.json user
          else

            # invalid password
            req.session.user = null  if req.session.user
            res.json
              error: "Invalid password"
            , 400
          return

      else
        res.json
          error: "User not found"
        , 404
      return###

module.exports = User