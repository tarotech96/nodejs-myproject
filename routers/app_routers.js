'use strict'
const userRouter = require('./user_router');
const productRouter = require('./product_router');
module.exports = (app) => {
  userRouter: userRouter(app)
  productRouter: productRouter(app)
}