const express = require("express");
var madversiting = require('../models/adversiting.model');
var mSendmail = require('../models/GuiThongTinQuangCaoByMail');
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
        userqc: row.reverse()
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
        userqc: row.reverse()
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
    var rowcats = await madversiting.allLoaiHang();
    var entity = {};
    entity.TenQuangCao = req.body.nameQC;
    entity.MaMatHang;
    if (req.categoryname === '') {

    } else {
        entity.MaMatHang = req.categoryname;
    }
    entity.MoTa = req.body.motaQC;
    console.log(req.body);
    if (req.body.motaQC !== "" && req.body.nameQC !== "") {
        var idx = await madversiting.addQC(entity);
        return res.render('./Admin/advertising/addQC', {
            page: 'Profile',
            profile: 'active',
            cats: rowcats,
            success: "Thêm quảng cáo thành công"
        })

    }
    else {
        return res.render('./Admin/advertising/addQC', {
            page: 'Profile',
            profile: 'active',
            cats: rowcats,
            success: "Thêm thất bại do chưa điền đầy đủ thông tin"
        })
    }
});
app.get('/sendtomailuser', async (req, res) => {
    var rowuser = await madversiting.alluser();
    var rowcats = await madversiting.allQC();
    return res.render('./Admin/advertising/sendAdvertisingtoUser', {
        page: 'Profile',
        profile: 'active',
        cats: rowcats,
        user: rowuser
    })
});
app.get('/sendtomailuser/:id', async (req, res) => {
    var idUser = req.params.id;
    var userFind = await madversiting.SelectOneUser(idUser);
    var infouser = 'Tên: ' + userFind[0].TenKH + ' - Email: ' + userFind[0].emailKH + ' - SĐT: 0' + userFind[0].SoDienThoai;

    var rowuser = await madversiting.alluser();
    var rowcats = await madversiting.allQC();

    return res.render('./Admin/advertising/sendAdvertisingtoUser', {
        page: 'Profile',
        profile: 'active',
        cats: rowcats,
        user: rowuser,
        userchoose: infouser,
        MaKHchoose: idUser
    })
});
app.post('/sendtomailuser/:id', async (req, res) => {
    var idUser = req.params.id;
    var entity = {};
    entity.MaQuangCaoGuiDi = req.body.categoryname;
    entity.MaKH = idUser;
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    entity.NgayGuiQuangCao=dateTime;
    // thêm quảng cáo lịch sử database
    var idx=await madversiting.addQCchoNguoiDung(entity);
    // tiến hành gửi mail cho người dùng
    // lấy emailuser
    var userFind = await madversiting.SelectOneUser(idUser);
    var mailuser=userFind[0].emailKH;
    var tenuser=userFind[0].TenKH;
    //Lấy thông tin quảng cáo
    var infoQC=await madversiting.SelectOneQC(req.body.categoryname);
   
    var sendmail=await mSendmail.sendEmailwithContent(mailuser,'Chào '+tenuser+'!!! Thông báo: '+infoQC[0].TenQuangCao,infoQC[0].MoTa+'\r\n'+'Thông tin thêm: '+req.body.motaQC);
    var rowuser = await madversiting.alluser();
    var rowcats = await madversiting.allQC();
    return res.render('./Admin/advertising/sendAdvertisingtoUser', {
        page: 'Profile',
        profile: 'active',
        cats: rowcats,
        user: rowuser,
        success:"Gửi quảng cáo cho người dùng thành công."
    })
});
module.exports = app;
