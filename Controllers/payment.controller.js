const HoaDon = require("../Models/hoadon.model");
const PhieuThanhToanThe = require("../Models/phieuthanhtoanthe.model");
module.exports = {
    HienThiThanhToan: async (req, res, MaHD) => {
        var hoaDon = await HoaDon.SelectOne1(MaHD);
        var tinhTrang = 1;
        if (hoaDon[0]!=null)
        {
            if (hoaDon[0].ThongTinXacNhanDonHang == "Chưa Thanh Toán") {
                tinhTrang = 0;
            }
        }
        res.render('./Admin/payment/XacNhanThanhToan', {
            page: 'Quản Lý Thông Tin Đặt Hàng / Xác Nhận Thanh Toán',
            thanhtoan: 'background-color:dodgerblue',
            HoaDon: hoaDon,
            TinhTrang: tinhTrang,
        })
    },

    XacNhanThanhToanTienMat: async (req, res) => {
        HoaDon.UpdateThanhToan(req.params.id, 1);
        res.render('./Admin/payment/ThanhCong', {
            page: 'Quản Lý Thông Tin Đặt Hàng / Xác Nhận Thanh Toán / Thanh Toán Tiền Mặt',
            thanhtoan: 'background-color:dodgerblue',
        })
    },

    HienThiThanhToanThe: async (req, res) => {
        res.render('./Admin/payment/ThanhToanThe', {
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
        var insert = await PhieuThanhToanThe.Add(object);
        HoaDon.UpdateThanhToan(req.params.id, 2);
        res.render('./Admin/payment/ThanhCong', {
            page: 'Quản Lý Thông Tin Đặt Hàng / Xác Nhận Thanh Toán / Thanh Toán Thẻ',
            thanhtoan: 'background-color:dodgerblue',
        })
    },
};

