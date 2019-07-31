'use strict'
const userRouter = require('./user_router');

module.exports = (app) => {
  userRouter: userRouter(app)
}