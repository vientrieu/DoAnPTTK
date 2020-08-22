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
////--------------------------Phần quản lí nội dung đăng--------------------
app.get('/web', (req, res) => {

    res.render('./Admin/advertising/Adv_web', {
        page: 'Profile',
        profile: 'active'
    })
});
app.get('/web/add', async (req, res) => {
    var rowcats = await madversiting.allLoaiHang();
    var rowdoitac = await madversiting.allDoiTac();
    res.render('./Admin/advertising/addhopdong', {
        page: 'Profile',
        profile: 'active',
        cats: rowcats,
        doitacs: rowdoitac.reverse()
    })
});
app.get('/web/adddoitac', async (req, res) => {
    res.render('./Admin/advertising/adddoitac', {
        page: 'Profile',
        profile: 'active',
    })
});
app.post('/web/adddoitac', async (req, res) => {

    console.log(req.body);
    if( req.body.tendoitac==''||req.body.motahopdong=='')
    {
        return res.render('./Admin/advertising/adddoitac', {
            page: 'Profile',
            profile: 'active',
            thongbao1: 'Bạn chưa nhập đầy đủ thông tin.'
        })
    }
    entity.TenDoiTac=req.body.tendoitac;
    entity.ThongTinVeDoiTac=req.body.motahopdong;
    res.render('./Admin/advertising/adddoitac', {
        page: 'Profile',
        profile: 'active',
    })
    
});
app.post('/web/add', async (req, res) => {
    var entity = {};
    entity.MaDoiTac = req.body.getmadoitac;
    entity.MaLoaiHang = req.body.getmaloaihang;
    entity.ThongTinViTriDang = req.body.thongtinvitridang;
    var ngaylaphopdong = req.body.ngaylaphopdong;
    var ngayhethan = req.body.ngayhethanhopdong;
    var rowcats = await madversiting.allLoaiHang();
    var rowdoitac = await madversiting.allDoiTac();
    console.log(req.body);
    if(req.body.thongtinvitridang==''||req.body.ngaylaphopdong==''||req.body.ngayhethanhopdong==''||req.body.motahopdong=='')
    {
        return res.render('./Admin/advertising/addhopdong', {
            page: 'Profile',
            profile: 'active',
            cats: rowcats,
            doitacs: rowdoitac.reverse(),
            thongbao1: 'Bạn chưa nhập đầy đủ thông tin.'
        })
    }
    if (ngaylaphopdong > ngayhethan) {

        return res.render('./Admin/advertising/addhopdong', {
            page: 'Profile',
            profile: 'active',
            cats: rowcats,
            doitacs: rowdoitac.reverse(),
            thongbao1: 'Bạn nhập thông tin vào chưa đúng.'
        })
    }
    else {
        var time='00:00:00';
        var dateTime1 = ngaylaphopdong + ' ' + time;
        var dateTime2 = ngayhethan + ' ' + time;
        entity.MoTa=req.body.motahopdong;
        entity.NgayKiHopDong=dateTime1;
        entity.NgayKetThucHopDong=dateTime2;
        await madversiting.addhopdong(entity);
        return res.render('./Admin/advertising/addhopdong', {
            page: 'Profile',
            profile: 'active',
            cats: rowcats,
            doitacs: rowdoitac.reverse(),
            thongbao: 'Thêm hợp đồng thành công.'
        })
    }
});
//--------------------------Phần quản lí gửi tin nhắn cho user--------------
app.get('/users', async (req, res) => {
    var row = await madversiting.allQuangcaoNguoiDung();
    for (const i in row) {
        var tempdate = moment(row[i].NgayGuiQuangCao, "YYYY-MM-DD HH:MM:SS").format("YYYY-MM-DD HH:MM:SS");
        row[i].NgayGuiQuangCao = tempdate;
    }
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
    if (req.body.categoryname === '') {
    } else {
        entity.MaMatHang = req.body.categoryname;
    }
    entity.MoTa = req.body.motaQC;
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
        cats: rowcats.reverse(),
        user: rowuser.reverse()
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
        cats: rowcats.reverse(),
        user: rowuser.reverse(),
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
    entity.NgayGuiQuangCao = dateTime;

    // tiến hành gửi mail cho người dùng
    // lấy emailuser
    var userFind = await madversiting.SelectOneUser(idUser);
    var mailuser = userFind[0].emailKH;
    var tenuser = userFind[0].TenKH;
    //Lấy thông tin quảng cáo
    var infoQC = await madversiting.SelectOneQC(req.body.categoryname);

    var sendmail = await mSendmail.sendEmailwithContent(mailuser, 'Chào ' + tenuser + '!!! Thông báo: ' + infoQC[0].TenQuangCao, infoQC[0].MoTa + '\r\n' + 'Thông tin thêm: ' + req.body.motaQC);
    var rowuser = await madversiting.alluser();
    var rowcats = await madversiting.allQC();
    //check quảng cáo đã gửi hay chưa
    var checkqcsend = await madversiting.CheckSendQC(req.body.categoryname, idUser);
    if (checkqcsend) {
        // thêm quảng cáo lịch sử database
        var idx = await madversiting.addQCchoNguoiDung(entity);
        return res.render('./Admin/advertising/sendAdvertisingtoUser', {
            page: 'Profile',
            profile: 'active',
            cats: rowcats.reverse(),
            user: rowuser.reverse(),
            success: "Gửi quảng cáo cho người dùng thành công."
        })
    } else {
        return res.render('./Admin/advertising/sendAdvertisingtoUser', {
            page: 'Profile',
            profile: 'active',
            cats: rowcats.reverse(),
            user: rowuser.reverse(),
            failure: "Gửi Quảng cáo không thành công, Vì đã gửi trước đó."
        })
    }

});
app.get('/history', async (req, res) => {
    var row = await madversiting.allQuangcaoNguoiDungvatenqc();
    var arrays = [];
    var datemow = Number(getdatenow());
    for (const i in row) {
        var x = row[i].NgayGuiQuangCao;
        var date1 = Number(x.getFullYear() + '' + (x.getMonth() + 1) + '' + x.getDate());
        if (date1 - datemow === 0) {

            var tempdate = moment(row[i].NgayGuiQuangCao, "YYYY-MM-DD HH:MM:SS").format("YYYY-MM-DD HH:MM:SS");
            row[i].NgayGuiQuangCao = tempdate;
            arrays.push(row[i]);
        }
    }
    res.render('./Admin/advertising/HistoryAdvTodayUser', {
        page: 'Profile',
        profile: 'active',
        userqc: arrays
    })
});
module.exports = app;

function getdatenow() {
    var today = new Date();
    var datetemp;
    datetemp = today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate();
    return datetemp;
}