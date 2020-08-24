const express = require("express");
var bodyParser = require('body-parser');
var payment = require('../Controllers/payment.controller');
const app = express.Router();

app.get('/', (req, res) => {
    payment.HienThiThanhToan(req, res, 0);
});

app.get('/:id', (req, res) => {
    payment.HienThiThanhToan(req, res, req.params.id);
});

app.get('/:id/loai=1', (req, res) => {
    payment.XacNhanThanhToanTienMat(req, res);
});

app.get('/:id/loai=2', (req, res) => {
    payment.HienThiThanhToanThe(req, res, req.params.id);
});
app.post('/:id/loai=2', (req, res) => {
    payment.XacNhanThanhToanThe(req, res);
});
module.exports = app;