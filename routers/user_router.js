'use strict'
const userController = require('../controllers/UserController');
module.exports = (app) => {
  // set router and call controller
  app.get('/user/list', userController.getAllUser)
    .post('/user/insert', userController.insertUser)
    .put('/user/update/:userId', userController.updateUser)
    .delete('/user/delete/:userId', userController.deleteUser)
    .post('/login', userController.login)
    .post('/register', userController.registration)
}