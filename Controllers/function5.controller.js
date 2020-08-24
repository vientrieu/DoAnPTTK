const HoaDon = require("../Models/hoadon.model");
const PhieuThanhToanThe = require("../Models/phieuthanhtoanthe.model");
module.exports = {
    HienThiThanhToan: async (req, res, MaHD) => {
        var hoaDon = await HoaDon.SelectOne(MaHD);
        var tinhTrang = 1;
        if (hoaDon[0]!=null)
        {
            if (hoaDon[0].ThongTinXacNhanDonHang == "Chưa Thanh Toán") {
                tinhTrang = 0;
            }
        }
        res.render('./Admin/XacNhanThanhToan', {
            page: 'Quản Lý Thông Tin Đặt Hàng / Xác Nhận Thanh Toán',
            thanhtoan: 'background-color:dodgerblue',
            HoaDon: hoaDon,
            TinhTrang: tinhTrang,
        })
    },

    XacNhanThanhToanTienMat: async (req, res) => {
        HoaDon.XacNhanThanhToan(req.params.id, 1);
        res.render('./Admin/ThanhCong', {
            page: 'Quản Lý Thông Tin Đặt Hàng / Xác Nhận Thanh Toán / Thanh Toán Tiền Mặt',
            thanhtoan: 'background-color:dodgerblue',
        })
    },

    HienThiThanhToanThe: async (req, res) => {
        res.render('./Admin/ThanhToanThe', {
            page: 'Quản Lý Thông Tin Đặt Hàng / Xác Nhận Thanh Toán / Thanh Toán Thẻ',
            thanhtoan: 'background-color:dodgerblue',
        })
    },

    XacNhanThanhToanThe: async (req, res) => {
        var object = {};
        object.MaHoaDon = req.params.id;
        object.SoTaiKhoanThe = req.body.sotaikhoan;
        object.HoTenChuThe = req.body.hoten;
        object.NganHang = req.body.nganhang;
        object.TongTien = req.body.sotien;
        PhieuThanhToanThe.Add(object);
        HoaDon.XacNhanThanhToan(req.params.id, 2);
        res.render('./Admin/ThanhCong', {
            page: 'Quản Lý Thông Tin Đặt Hàng / Xác Nhận Thanh Toán / Thanh Toán Thẻ',
            thanhtoan: 'background-color:dodgerblue',
        })
    },
};

