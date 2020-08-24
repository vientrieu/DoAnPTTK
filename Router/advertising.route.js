const express = require("express");
var madversiting = require('../models/adversiting.model');

var ctladv = require('../Controllers/advertising.controller')
const moment = require("moment");
const app = express.Router();
app.get('/', (req, res) => {
    ctladv.TrangChuHomeQuanLiQuangCao(req,res);
});
////--------------------------Phần quản lí nội dung đăng--------------------
app.get('/web', (req, res) => {

    ctladv.ViewQuanLiQuangCaoWeb(req,res);
});
app.get('/web/add', async (req, res) => {
    ctladv.AddHopDongQuangCaoView(req, res);
});
app.get('/web/adddoitac', async (req, res) => {
    ctladv.ThemDoiTacQuangCaoView(req,res);
});
app.post('/web/adddoitac', async (req, res) => {
    ctladv.AddDoiTacView(req, res);
});
app.post('/web/add', async (req, res) => {
    ctladv.AddHopDongQuangCao(req, res);
});
app.get('/web/edit', async (req, res) => {
    ctladv.EditHopDongQuangCaoView(req,res);
});
app.get('/web/edit/:id', async (req, res) => {
    ctladv.EditHopDongQuangCao(req,res);
});

app.post('/web/edit/:id', async (req, res) => {

    ctladv.UpdateHopDongDB(req,res,req.params.id);

});
app.get('/web/delete/:id', async (req, res) => {
    ctladv.DeleteHopDong(req,res,req.params.id);
});
//--------------------------Phần quản lí gửi tin nhắn cho user--------------
app.get('/users', async (req, res) => {
    ctladv.QuanLiUser(req,res);
});

app.get('/user/:id', async (req, res) => {
    ctladv.XemChiTietQuangCao(req,res,req.params.id);
});

app.get('/add', async (req, res) => {
    ctladv.ThemQuangCaoNguoiDungView(req,res);
});

app.post("/add", async (req, res) => {
    ctladv.ThemQuangCaoNguoiDungAdd(req,res);
});
app.get('/sendtomailuser', async (req, res) => {
    ctladv.GuiMailChoKHview(req,res);
});
app.get('/sendtomailuser/:id', async (req, res) => {
    ctladv.getInfoUserSenmail(req,res,req.params.id);
});
app.post('/sendtomailuser/:id', async (req, res) => {
    ctladv.SendmailuserDB(req,res,req.params.id)
});
app.get('/history', async (req, res) => {
    ctladv.ShowHistoryQuangCaoUser(req,res);
});
app.get('/web/info', async (req, res) => {
    ctladv.ThongTinQuangCaoWeb(req,res);
});
module.exports = app;