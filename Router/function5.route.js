const express = require("express");
var fun5 = require('../Controllers/function5.controller');
const app = express.Router();

app.get('/thanhtoan/', (req, res) => {
    fun5.HienThiThanhToan(req, res, 0);
});
app.get('/dathang/', (req, res) => {
    fun5.HienThiThanhToan(req, res, 0);
});

app.get('/thanhtoan/:id', (req, res) => {
    fun5.HienThiThanhToan(req, res, req.params.id);
});
module.exports = app;