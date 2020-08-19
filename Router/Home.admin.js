const express = require("express");
const app = express.Router();
app.get('/', (req, res) => {
    res.redirect('/function-1');
});
app.get('/admin/quanlisanpham', (req, res) => {
    res.render('./Admin/statistic', {
        page: 'Profile',
        profile: 'active'
    })
});
app.get('/admin/quanlithongtindathang', (req, res) => {
    res.render('./Admin/business-management', {
        page: 'Profile',
        profile: 'active'
    })
});
//---------------------------------------------------------------
//phần quảng cáo 
app.get('/admin/advertising', (req, res) => {
    res.render('./Admin/advertising/advertising', {
        page: 'Profile',
        profile: 'active'
    })
});
app.get('/admin/advertising/web', (req, res) => {
    res.render('./Admin/advertising/advertising', {
        page: 'Profile',
        profile: 'active'
    })
});
app.get('/admin/advertising/users', (req, res) => {
    res.render('./Admin/advertising/advertising', {
        page: 'Profile',
        profile: 'active'
    })
});
//Hết phần quảng cáo
//---------------------------------------------------------------
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