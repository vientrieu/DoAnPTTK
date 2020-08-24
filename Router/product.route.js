const express = require("express");
var ctlproduct = require('../Controllers/product1.controller');
const app = express.Router();

app.get('/', (req, res) => {
    ctlproduct.TrangChuQuanLiSanPham(req,res);
});
app.get('/nhaphang', (req, res) => {
    ctlproduct.NhapHangView(req,res);
});


app.get('/nhaphang/adddondathang', (req, res) => {
    ctlproduct.NhapHangDonDatHangView(req,res);
});

app.post('/nhaphang/adddondathang', (req, res) => {
    ctlproduct.NhapHangDonDatHangAdd(req,res);
});
app.get('/nhaphang/adddondathang/addnhacungcap', (req, res) => {
    ctlproduct.ThemNhaCungCapView(req,res);
});
app.post('/nhaphang/adddondathang/addnhacungcap', (req, res) => {
    ctlproduct.ThemNhaCungCapAdd(req,res);
});
app.get('/nhaphang/addmathang', (req, res) => {
    ctlproduct.addmathangView(req,res);
});

app.get('/nhaphang/addmathang/:id', (req, res) => {

    ctlproduct.addMatHangInDon(req,res,req.params.id);
});
app.post('/nhaphang/addmathang/:id', (req, res) => {

    ctlproduct.addMatHangInDondb(req,res,req.params.id);
});
app.get('/nhaphang/addmathangdb', (req, res) => {

    ctlproduct.addMatHangDBview(req,res);
});
app.get('/nhaphang/chitiet/:id', (req, res) => {
    ctlproduct.ShowChiTietMatHang(req,res,req.params.id);
});
// Tra hang ----------------
app.get('/trahang', (req, res) => {
    ctlproduct.TraHangView(req,res);
});




app.get('/trahang/adddontrahang', (req, res) => {
    ctlproduct.NhapHangDonTraHangView(req,res);
});
app.post('/trahang/adddontrahang', (req, res) => {
    ctlproduct.TraHangDonTraHangAdd(req,res);
});
app.get('/trahang/addmathang', (req, res) => {
    ctlproduct.addmathangViewDonTraHang(req,res);
});

app.get('/trahang/addtrahang/:id', (req, res) => {

    ctlproduct.addMatHangInDonTraHang(req,res,req.params.id);
});

app.post('/trahang/addtrahang/:id', (req, res) => {

    ctlproduct.addMatHangInDonTraHangdb(req,res,req.params.id);
});

app.get('/trahang/chitiet/:id', (req, res) => {
    ctlproduct.ShowChiTietMatHangTraHang(req,res,req.params.id);
});



module.exports = app;