const express = require("express");
var madversiting = require('../models/adversiting.model');
const moment = require("moment");
const app = express.Router();
app.get('/', (req, res) => {
    res.render('./Admin/advertising/advertising', {
        page: 'Profile',
        profile: 'active'
    })
});
app.get('/web', (req, res) => {

    res.render('./Admin/advertising/advertising', {
        page: 'Profile',
        profile: 'active'
    })
});
app.get('/users', async (req, res) => {
    var row = await madversiting.allQuangcaoNguoiDung();
    for (const i in row) {
        var tempdate = moment(row[i].NgayGuiQuangCao, "YYYY-MM-DD HH:MM:SS").format("YYYY-MM-DD HH:MM:SS");

        row[i].NgayGuiQuangCao = tempdate;
    }
    console.log(row);
    res.render('./Admin/advertising/Adv_User', {
        page: 'Profile',
        profile: 'active',
        userqc: row
    })
});

app.get('/user/:id', async (req, res) => {
    var idUser = req.params.id;
    var row = await madversiting.GetThongQCKH(idUser);
    for (const i in row) {
        var tempdate = moment(row[i].NgayGuiQuangCao, "YYYY-MM-DD HH:MM:SS").format("YYYY-MM-DD HH:MM:SS");
        if (row[i].MaMatHang === null) { row[i].MaMatHang = 'Nhiều loại mặt hàng' }
        row[i].NgayGuiQuangCao = tempdate;
    }
    res.render('./Admin/advertising/detailUser', {
        page: 'Profile',
        profile: 'active',
        MaKH: idUser,
        userqc: row
    })

});

app.get('/add', async (req, res) => {
    var rowcats = await madversiting.allLoaiHang();

    res.render('./Admin/advertising/addQC', {
        page: 'Profile',
        profile: 'active',
        cats: rowcats
    })
});

app.post("/add", async (req, res) => {

    var entity = {};
    entity.TenQuangCao = req.body.nameQC;
    entity.MaMatHang = 1;
    entity.MoTa = req.body.motaQC;
    
    var idx = await madversiting.addQC(entity);
    var rowcats = await madversiting.allLoaiHang();

    res.render('./Admin/advertising/addQC', {
        page: 'Profile',
        profile: 'active',
        cats: rowcats,
        success:"Thêm quảng cáo thành công"
    })
});
module.exports = app;