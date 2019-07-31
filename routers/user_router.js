'use strict'
const userController = require('../controllers/UserController');

// Create function verifyToken() to check whether or not a token exists
function verifyToken(req, res, next) {
  var bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    let arrHeader = bearerHeader.split(' ');
    // get bearerToken from headers of request
    let bearerToken = arrHeader[1];
    // Set token into request
    req.token = bearerToken;
    // next middleware
    next();
  } else {
    res.sendStatus(403);
    res.json({
      message: 'Token is null'
    })
  }
}
module.exports = (app) => {
  // set router and call controller
  app.get('/user/list', verifyToken, userController.getAllUser)
    .post('/user/insert', userController.insertUser)
    .put('/user/update/:userId', userController.updateUser)
    .delete('/user/delete/:userId', userController.deleteUser)
    .post('/login', userController.login)
    .post('/register', userController.registration)
}