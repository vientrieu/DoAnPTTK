const HoaDon = require("../Models/hoadon.model");
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
    }
};

