const DanhGia = require("../Models/danhgia.model");
// const PhieuThanhToanThe = require("../Models/phieuthanhtoanthe.model");
module.exports = {
    LoadAllComment: async (req, res) => {
        var danhGia = await DanhGia.SelectAll("1=1");
        res.render('./Admin/comment/comment', {
            page: 'Quản Lý Sản Phẩm / Phản Hồi Từ Khách Hàng',
            sanpham: 'background-color:dodgerblue',
            DanhGia: danhGia,
        })
    },

    LoadGoodComment: async (req, res) => {
        var danhGia = await DanhGia.SelectAll("DiemDanhGia>3");
        res.render('./Admin/comment/good-comment', {
            page: 'Quản Lý Sản Phẩm / Phản Hồi Từ Khách Hàng',
            sanpham: 'background-color:dodgerblue',
            DanhGia: danhGia,
        })
    },

    LoadBadComment: async (req, res) => {
        var danhGia = await DanhGia.SelectAll("DiemDanhGia<=3");
        res.render('./Admin/comment/bad-comment', {
            page: 'Quản Lý Sản Phẩm / Phản Hồi Từ Khách Hàng',
            sanpham: 'background-color:dodgerblue',
            DanhGia: danhGia,
        })
    },

    DeleteComment: async (req, res) => {
        var XoaDanhGia = await DanhGia.DeleteOne(req.params.id);
    },
};

