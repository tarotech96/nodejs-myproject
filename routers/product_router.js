'use strict'
const ProductController = require('./../controllers/ProductController');
module.exports = (app) => {
    app.get('/product/list', ProductController.getAllProduct)
        .post('/product/insert', ProductController.insertProduct)
        .post('product/update/:productId', ProductController.updateProduct)
        .put('/product/delete/:productId', ProductController.deleteProduct)
}