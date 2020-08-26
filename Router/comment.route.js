const express = require("express");
var comment = require('../Controllers/comment.controller');
const app = express.Router();

app.get('/', (req, res) => {
    res.redirect('/admin/quanlisanpham/phanhoi/tong');
});

app.get('/tong', (req, res) => {
    comment.LoadAllComment(req, res);
});

app.get('/phanhoitot', (req, res) => {
    comment.LoadGoodComment(req, res);
});

app.get('/phanhoixau', (req, res) => {
    comment.LoadBadComment(req, res);
});

app.post('/delete/:id', (req, res) => {
    comment.DeleteComment(req, res);
});
module.exports = app;