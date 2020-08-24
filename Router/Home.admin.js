const express = require("express");
const moment = require("moment");
const app = express.Router();
app.get('/', (req, res) => {
    res.redirect('/admin/quanlisanpham');
});

app.use('/admin/quanlisanpham/', require('./product.route'));

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