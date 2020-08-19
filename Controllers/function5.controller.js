const HoaDon = require("../Models/hoadon.model");
module.exports = {
    TruyCapHoaDon: async (req, res, MaHD) => {
        var hoaDon = await HoaDon.SelectOne(MaHD);
        res.render('./Admin/XacNhanThanhToan', {
            page: 'Xác Nhận Thanh Toán',
            thanhtoan: 'active'
        })
    }
};

