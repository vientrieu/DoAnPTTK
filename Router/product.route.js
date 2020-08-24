const express = require("express");
var ctlproduct = require('../Controllers/product1.controller');
const app = express.Router();

app.get('/', (req, res) => {
    ctlproduct.TrangChuQuanLiSanPham(req,res);
});
app.get('/nhaphang', (req, res) => {
    ctlproduct.NhapHangView(req,res);
});
app.get('/trahang', (req, res) => {
    ctlproduct.TrangChuQuanLiSanPham(req,res);
});
module.exports = app;