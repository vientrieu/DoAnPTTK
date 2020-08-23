const express = require("express");
const moment = require("moment");
const app = express.Router();
app.get('/', (req, res) => {
    res.redirect('/admin/quanlisanpham');
});
app.get('/admin/quanlisanpham', (req, res) => {
    res.render('./Admin/statistic', {
        page: 'Quản Lý Sản Phẩm',
        sanpham: 'background-color:dodgerblue'
    })
});
app.use('/admin/quanlithongtindathang/', require('./function5.route'));
app.use('/admin/advertising/', require('./advertising.route'));
app.get('/function-4', (req, res) => {
    res.render('./Admin/profile', {
        page: 'Profile',
        profile: 'active'
    })
});
app.get('/function-5', (req, res) => {
    res.render('./Admin/profile', {
        page: 'Profile',
        profile: 'active'
    })
});
module.exports = app;