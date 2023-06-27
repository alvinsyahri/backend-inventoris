const User = require('../../model/User');
const bycryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {

    validateLogin : (req, res) =>{
      const { username, password } = req.body;
      if( username === undefined || username === "" || password === undefined || password === ""){
        res.status(400).json({ msg: "Invalid Data"})
      }
      next();
    },

    actionLogin : async (req, res) => {
        try {
          const { username, password } = req.body;
          const user = await User.findOne({ username: username });
          if (!user) {
            res.redirect('/login').json({Login: false});
          }
          const isPasswordMatch = await bycryptjs.compare(password, user.password);
          if (!isPasswordMatch) {
            res.redirect('/login').json({Login: false});
          }
          req.session.username = user.username;
          const name = req.session.user;

          const token = jwt.sign({name}, "our-json-secret-key", {expiresIn: '1d'});
          res.cookie('token', token);
          res.json({Login: true, username: req.session.username});
          
          res.redirect('/dashboard');
    
        } catch (error) {
          res.redirect('/login');
        }
      },
    
      actionLogout : (req, res) => {
        req.session.destroy();
        res.redirect('/login');
      },
}