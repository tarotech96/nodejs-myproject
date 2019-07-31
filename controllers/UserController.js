'use strict'
const db = require('../database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { LocalStorage } = require('node-localstorage');
const localstorage = new LocalStorage('./scratch');
module.exports = {
  // get list users from database
  getAllUser: (req, res) => {
    jwt.verify(req.token, 'secret_key', (err, data) => {
      if (err) {
        res.send('Get data failed');
      } else {
        let sql = 'SELECT * FROM users';
        db.query(sql, (err, data) => {
          if (err) {
            res.json({
              message: 'Get data failed'
            })
          }
          res.json({
            data: data,
            message: 'Get list users successfull'
          });
        });
      }
    })
  },
  // insert new user into database
  insertUser: (req, res) => {
    let params = req.body;
    let sql = 'INSERT INTO users SET ?';
    db.query(sql, [params], (err, result) => {
      if (err) {
        res.json({
          message: 'Inserted failed'
        })
      }
      res.json({
        message: 'Inserted successfull'
      });
    })
  },
  // update a user in database
  updateUser: (req, res) => {
    let params = req.body;
    let userId = req.params.userId;
    let sql = 'UPDATE users SET ? WHERE id = ?';
    db.query(sql, [params, userId], (err, result) => {
      if (err) {
        res.json({
          message: 'Update failed'
        })
      }
      res.json({
        message: 'Updated successfull'
      });
    })
  },
  // selete a user in database
  deleteUser: (req, res) => {
    let userId = req.params.userId;
    let sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
      if (err) {
        res.json({
          message: 'Deleted failed'
        })
      }
      res.json({
        message: 'Deleted successfull'
      });
    })
  },
  // login
  login: (req, res) => {
    const userLogin = {
      email: `${req.body.email}`,
      password: `${req.body.password}`
    };
    // use sign() method to create token includes: email, password, secret key, expireTime
    jwt.sign({ userLogin }, 'secret_key', { expiresIn: 60 * 60 }, (error, token) => {
      if (error) {
        res.sendStatus(403).send('Sorry token forbidden');
      } else {
        // query check email in database
        let sql = 'SELECT * FROM users WHERE email = ?';
        db.query(sql, [userLogin.email], (err, result) => {
          if (err) {
            res.json({
              message: 'Login failed'
            });
          } else {
            // compare entered password with hashed password in database by compare() method
            bcrypt.compare(userLogin.password, result[0].password, (err, resultCompare) => {
              if (err) throw err;
              if (resultCompare) {
                // get info user login
                userLogin.name = result[0].name;
                userLogin.phone = result[0].phone;
                userLogin.birthday = result[0].birthday;
                // store user info and token in localstorage
                localstorage.setItem('token', token);
                localstorage.setItem('user', JSON.stringify(userLogin));
                // redirect to home page
                res.redirect('/');
              } else {
                res.json({
                  message: 'Password in valid.Please enter again'
                })
              }
            })
          }
        })
      }
    });
  },
  // registration
  registration: async (req, res) => {
    var body = req.body;
    var emailRegister = body.email;
    // Encode password registration
    var salt = await bcrypt.genSalt(10);
    var passwordHash = await bcrypt.hash(body.password, salt);
    body.password = passwordHash;

    // select user with emailjust entered
    // If there are results, an email error message already exists
    let sqlCheckEmail = 'SELECT * FROM users WHERE email = ?';
    db.query(sqlCheckEmail, [emailRegister], (err, result) => {
      if (err) throw err;
      if (typeof result !== 'undefined' && result.length > 0) {
        res.send('Email already exists');
      } else {
        let sql = 'INSERT INTO users SET ?';
        db.query(sql, [body], (err, result) => {
          if (err) {
            res.send('Register Failed');
          } else {
            setTimeout(() => {
              res.redirect('/login');
            }, 2000)
          }
        });
      }
    });
  }
}