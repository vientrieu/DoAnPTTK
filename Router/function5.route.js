const express = require("express");
var bodyParser = require('body-parser');
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

app.get('/thanhtoan/:id/loai=1', (req, res) => {
    fun5.XacNhanThanhToanTienMat(req, res);
});

app.get('/thanhtoan/:id/loai=2', (req, res) => {
    fun5.HienThiThanhToanThe(req, res, req.params.id);
});
app.post('/thanhtoan/:id/loai=2', (req, res) => {
    fun5.XacNhanThanhToanThe(req, res);
});
module.exports = app;