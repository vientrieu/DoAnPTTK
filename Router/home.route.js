const express = require("express");
const moment = require("moment");
const app = express.Router();
app.get('/', (req, res) => {
    res.redirect('/admin/quanlisanpham');
});
app.use('/admin/quanlisanpham/', require('./product.route'));
app.use('/admin/quanlithongtindathang/thanhtoan', require('./payment.route'));
app.use('/admin/advertising/', require('./advertising.route'));
module.exports = app;