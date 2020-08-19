let mysqlconnect = require('../database/mysql');
module.exports = {
    SelectAll: async () => {
        try {
            const sql = `SELECT * FROM hoadon`;
            const rows = await mysqlconnect.load(sql);
            return rows;
        } catch (error) {
            console.log("Error Model: HoaDon: selectAll ", error);
        }
    },
    SelectOne: async (MaHD) => {
        try {
            const sql = `SELECT * FROM hoadon WHERE MaHoaDon = ${MaHD}`;
            const rows = await mysqlconnect.load(sql);
            return rows;
        } catch (error) {
            console.log("Error Model: HoaDon: selectOne ", error);
        }
    },
    XacNhanThanhToan: async (MaHD, HinhThucThanhToan) => {
        try {
            const sql = `UPDATE hoadon SET HinhThucThanhToan = ${HinhThucThanhToan}, ThongTinXacNhanDonHang = 'Da Thanh Toan' WHERE MaHoaDon = ${MaHD}`;
        } catch (error) {
            console.log("Error Model: HoaDon: XacNhanThanhToan ", error);
        }
    }
};
