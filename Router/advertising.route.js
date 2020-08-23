const express = require("express");
var madversiting = require('../models/adversiting.model');
var mSendmail = require('../models/GuiThongTinQuangCaoByMail');
const moment = require("moment");
const app = express.Router();
app.get('/', (req, res) => {
    res.render('./Admin/advertising/advertising', {
        page: 'Quảng Cáo',
        quangcao: 'background-color:dodgerblue'
    })
});
////--------------------------Phần quản lí nội dung đăng--------------------
app.get('/web', (req, res) => {

    res.render('./Admin/advertising/Adv_web', {
        page: 'Quảng Cáo',
        quangcao: 'background-color:dodgerblue'
    })
});
app.get('/web/add', async (req, res) => {
    var rowcats = await madversiting.allLoaiHang();
    var rowdoitac = await madversiting.allDoiTac();
    res.render('./Admin/advertising/addhopdong', {
        page: 'Quảng Cáo',
        quangcao: 'background-color:dodgerblue',
        cats: rowcats,
        doitacs: rowdoitac.reverse()
    })
});
app.get('/web/adddoitac', async (req, res) => {
    res.render('./Admin/advertising/adddoitac', {
        page: 'Quảng Cáo',
        quangcao: 'background-color:dodgerblue',
    })
});
app.post('/web/adddoitac', async (req, res) => {
    entity = {};
    if (req.body.tendoitac == '' || req.body.motahopdong == '') {
        return res.render('./Admin/advertising/adddoitac', {
            page: 'Quảng Cáo',
            quangcao: 'background-color:dodgerblue',
            thongbao1: 'Bạn chưa nhập đầy đủ thông tin.'
        })
    }
    entity.TenDoiTac = req.body.tendoitac;
    entity.ThongTinVeDoiTac = req.body.motahopdong;
    await madversiting.adddoitac(entity);
    res.render('./Admin/advertising/adddoitac', {
        page: 'Quảng Cáo',
        quangcao: 'background-color:dodgerblue',
        thongbao: 'Thêm đối tác thành công.'
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
    if (req.body.thongtinvitridang == '' || req.body.ngaylaphopdong == '' || req.body.ngayhethanhopdong == '' || req.body.motahopdong == '') {
        return res.render('./Admin/advertising/addhopdong', {
            page: 'Quảng Cáo',
            quangcao: 'background-color:dodgerblue',
            cats: rowcats,
            doitacs: rowdoitac.reverse(),
            thongbao1: 'Bạn chưa nhập đầy đủ thông tin.'
        })
    }
    if (ngaylaphopdong > ngayhethan) {

        return res.render('./Admin/advertising/addhopdong', {
            page: 'Quảng Cáo',
            quangcao: 'background-color:dodgerblue',
            cats: rowcats,
            doitacs: rowdoitac.reverse(),
            thongbao1: 'Bạn nhập thông tin vào chưa đúng.'
        })
    }
    else {
        var time = '00:00:00';
        var dateTime1 = ngaylaphopdong + ' ' + time;
        var dateTime2 = ngayhethan + ' ' + time;
        entity.MoTa = req.body.motahopdong;
        entity.NgayKiHopDong = dateTime1;
        entity.NgayKetThucHopDong = dateTime2;
        await madversiting.addhopdong(entity);
        return res.render('./Admin/advertising/addhopdong', {
            page: 'Quảng Cáo',
            quangcao: 'background-color:dodgerblue',
            cats: rowcats,
            doitacs: rowdoitac.reverse(),
            thongbao: 'Thêm hợp đồng thành công.'
        })
    }
});
app.get('/web/edit', async (req, res) => {
    var row = await madversiting.Allhopdong();
    var datetemp = '';
    for (const i in row) {
        if (row[i].NgayKetThucHopDong.getDate() < 10)
            datetemp = row[i].NgayKetThucHopDong.getFullYear() + '' + (row[i].NgayKetThucHopDong.getMonth() + 1) + '0' + row[i].NgayKetThucHopDong.getDate();
        else {
            datetemp = row[i].NgayKetThucHopDong.getFullYear() + '' + (row[i].NgayKetThucHopDong.getMonth() + 1) + '' + row[i].NgayKetThucHopDong.getDate();
        }


        var tempdate = moment(row[i].NgayKiHopDong, "YYYY-MM-DD HH:MM:SS").format("YYYY-MM-DD HH:MM:SS");
        var tempdate1 = moment(row[i].NgayKetThucHopDong, "YYYY-MM-DD HH:MM:SS").format("YYYY-MM-DD HH:MM:SS");
        row[i].NgayKiHopDong = tempdate;
        row[i].NgayKetThucHopDong = tempdate1;
        if (Number(getdatenow()) > Number(datetemp)) {
            row[i].tinhtrang = 'Hết hạn';
            row[i].giahan = 'và gia hạn';
        }
        else {
            row[i].tinhtrang = 'Còn hạn';
        }
    }

    return res.render('./Admin/advertising/quanliproduct', {
        page: 'Profile',
        profile: 'active',
        hopdong: row.reverse()
    })
});
app.get('/web/edit/:id', async (req, res) => {
    var idhopdong = req.params.id;
    var rowhopdong = await madversiting.SelectOnehopdong(idhopdong);
    var rowcats = await madversiting.allLoaiHang();
    var rowdoitac = await madversiting.allDoiTac();
    for (const i in rowcats) {
        if (rowcats[i].MaLoaiHang == rowhopdong[0].MaLoaiHang) {
            rowcats[i].chonlua1 = 'selected';
        }
    }
    for (const i in rowcats) {
        if (rowdoitac[i].MaDoiTac == rowhopdong[0].MaDoiTac) {
            rowdoitac[i].chonlua = 'selected';
        }
    }
    res.render('./Admin/advertising/edithopdong', {
        page: 'Profile',
        profile: 'active',
        cats: rowcats,
        doitacs: rowdoitac.reverse(),
        hopdonhnow: rowhopdong[0],
        MaHopDong: idhopdong
    })

});

app.post('/web/edit/:id', async (req, res) => {

    var idhopdong = req.params.id;
    var rowhopdong = await madversiting.SelectOnehopdong(idhopdong);
    console.log(req.body)
    var entity = {};
    entity.MaHopDong=idhopdong;
    entity.MaDoiTac = req.body.getmadoitac;
    entity.MaLoaiHang = req.body.getmaloaihang;
    entity.ThongTinViTriDang = req.body.thongtinvitridang;
    var rowcats = await madversiting.allLoaiHang();
    var rowdoitac = await madversiting.allDoiTac();
    var ngayhethan = req.body.ngayhethanhopdong;
    if (req.body.thongtinvitridang == '' || req.body.motahopdong == '') {
        for (const i in rowcats) {
            if (rowcats[i].MaLoaiHang == rowhopdong[0].MaLoaiHang) {
                rowcats[i].chonlua1 = 'selected';
            }
        }
        for (const i in rowcats) {
            if (rowdoitac[i].MaDoiTac == rowhopdong[0].MaDoiTac) {
                rowdoitac[i].chonlua = 'selected';
            }
        }
        return res.render('./Admin/advertising/edithopdong', {
            page: 'Profile',
            profile: 'active',
            cats: rowcats,
            doitacs: rowdoitac.reverse(),
            hopdonhnow: rowhopdong[0],
            thongbao1: 'Bạn chưa nhập đầy đủ thông tin.'
        })
    }
    if(req.body.ngayhethanhopdong == '')
    {
        var tempdate = moment(rowhopdong[0].NgayKetThucHopDong, "YYYY-MM-DD HH:MM:SS").format("YYYY-MM-DD HH:MM:SS");
        entity.NgayKetThucHopDong=tempdate;
        
    }
    else{
    var time = '00:00:00';
    var dateTime2 = ngayhethan + ' ' + time;
    entity.MoTa = req.body.motahopdong;
    entity.NgayKetThucHopDong = dateTime2;
    }
    await madversiting.updatehopdong(entity);
    return res.render('./Admin/advertising/edithopdong', {
        page: 'Profile',
        profile: 'active',
        cats: rowcats,
        doitacs: rowdoitac.reverse(),
        hopdonhnow: rowhopdong[0],
        thongbao: 'Cập nhật hợp đồng thành công.'
    })

});
app.get('/web/delete/:id', async (req, res) => {
    var idhopdong = req.params.id;
  await madversiting.deletehopdong(idhopdong);
  return res.redirect('/admin/advertising/web/edit');
});
//--------------------------Phần quản lí gửi tin nhắn cho user--------------
app.get('/users', async (req, res) => {
    var row = await madversiting.allQuangcaoNguoiDung();
    for (const i in row) {
        var tempdate = moment(row[i].NgayGuiQuangCao, "YYYY-MM-DD HH:MM:SS").format("YYYY-MM-DD HH:MM:SS");
        row[i].NgayGuiQuangCao = tempdate;
    }
    res.render('./Admin/advertising/Adv_User', {
        page: 'Quảng Cáo',
        quangcao: 'background-color:dodgerblue',
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
        page: 'Quảng Cáo',
        quangcao: 'background-color:dodgerblue',
        MaKH: idUser,
        userqc: row.reverse()
    })

});

app.get('/add', async (req, res) => {
    var rowcats = await madversiting.allLoaiHang();

    res.render('./Admin/advertising/addQC', {
        page: 'Quảng Cáo',
        quangcao: 'background-color:dodgerblue',
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
            page: 'Quảng Cáo',
            quangcao: 'background-color:dodgerblue',
            cats: rowcats,
            success: "Thêm quảng cáo thành công"
        })
    }
    else {
        return res.render('./Admin/advertising/addQC', {
            page: 'Quảng Cáo',
            quangcao: 'background-color:dodgerblue',
            cats: rowcats,
            success: "Thêm thất bại do chưa điền đầy đủ thông tin"
        })
    }
});
app.get('/sendtomailuser', async (req, res) => {
    var rowuser = await madversiting.alluser();
    var rowcats = await madversiting.allQC();
    return res.render('./Admin/advertising/sendAdvertisingtoUser', {
        page: 'Quảng Cáo',
        quangcao: 'background-color:dodgerblue',
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
        page: 'Quảng Cáo',
        quangcao: 'background-color:dodgerblue',
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
            page: 'Quảng Cáo',
            quangcao: 'background-color:dodgerblue',
            cats: rowcats.reverse(),
            user: rowuser.reverse(),
            success: "Gửi quảng cáo cho người dùng thành công."
        })
    } else {
        return res.render('./Admin/advertising/sendAdvertisingtoUser', {
            page: 'Quảng Cáo',
            quangcao: 'background-color:dodgerblue',
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
        page: 'Quảng Cáo',
        quangcao: 'background-color:dodgerblue',
        userqc: arrays
    })
});
app.get('/web/info', async (req, res) => {
    var row = await madversiting.allqcwebinfo()
    res.render('./Admin/advertising/thongtinquangcaoweb', {
        page: 'Profile',
        profile: 'active',
        qcweb:row
    })
});
module.exports = app;

function getdatenow() {
    var today = new Date();
    var datetemp;
    datetemp = today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate();
    return datetemp;
}