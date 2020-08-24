const express = require("express");
var ctlproduct = require('../Controllers/product1.controller');
const app = express.Router();

app.get('/', (req, res) => {
    ctlproduct.TrangChuQuanLiSanPham(req,res);
});
module.exports = app;