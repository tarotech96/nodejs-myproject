'use strict'
const db = require('./../database');
module.exports = {
    getAllProduct: (req, res) => {
        var sql = 'SELECT * FROM products';
        db.query(sql, (err, results) => {
            if (err) {
                res.json({
                    message: 'Get data failed'
                });
            } else {
                res.json({
                    message: 'Get data successfull',
                    data: results
                });
            }
        });
    },

    insertProduct: (req, res) => {
        var params = req.body;
        var sql = 'INSERT INTO products SET ?';
        db.query(sql, [params], (err, result) => {
            if (err) {
                res.json({
                    message: 'Insert Failed'
                });
            } else {
                res.json({
                    message: 'Insert Sucessfull',
                    result: result
                })
            }
        })
    },

    updateProduct: (req, res) => {
        var data = req.body;
        var productId = req.params.productId
        var sql = 'UPDATE products SET ? WHERE id = ?';
        db.query(sql, [data, productId], (err, result) => {
            if (err) {
                res.json({
                    message: 'Update failed'
                })
            } else {
                res.json({
                    message: 'Update successfull'
                })
            }
        })
    },

    deleteProduct: (req, res) => {
        var productId = req.params.productId;
        var sql = 'DELETE FROM products WHERE id = ?';
        db.query(sql, [productId], (err, result) => {
            if (err) {
                res.json({
                    message: 'Delete failed'
                })
            } else {
                res.json({
                    message: 'Delete successfull'
                })
            }
        })
    }
}