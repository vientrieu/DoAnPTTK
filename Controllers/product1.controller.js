const HoaDon = require("../Models/hoadon.model");
module.exports = {
    TrangChuQuanLiSanPham: async (req, res) => {
        res.render('./Admin/productmanager/product', {
            page: 'Quản Lý Sản Phẩm',
            sanpham: 'background-color:dodgerblue'
        })
    },
    NhapHangView: async (req, res) => {
        res.render('./Admin/productmanager/inproduct', {
            page: 'Quản Lý Sản Phẩm',
            sanpham: 'background-color:dodgerblue'
        })
    },
};
