const express = require("express");
const app = express.Router();
app.get('/admin/advertising', (req, res) => {
    res.render('./Admin/advertising/advertising', {
        page: 'Profile',
        profile: 'active'
    })
});
app.get('/admin/advertising/web', (req, res) => {

    res.render('./Admin/advertising/advertising', {
        page: 'Profile',
        profile: 'active'
    })
});
app.get('/admin/advertising/users', async (req, res) => {
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

app.get('/admin/advertising/user/:id', async (req, res) => {
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

app.get('/admin/advertising/add', async (req, res) => {
    var rowcats = await madversiting.allLoaiHang();

    res.render('./Admin/advertising/addQC', {
        page: 'Profile',
        profile: 'active',
        cats: rowcats
    })
});

app.post("/admin/AddQC", async (req, res) => {

    var entity = {};
    entity.TenQuangCao = req.body.nameQC;
    entity.MaMatHang = 1;
    entity.MoTa = req.body.motaQC;
    console.log(entity);
    var idx = await madversiting.addQC(entity);
    console.log(idx);
});
module.exports = app;