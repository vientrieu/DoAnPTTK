let mysqlconnect = require('../database/mysql');
module.exports = {
    SelectAll: async (DieuKien) => {
        try {
            const sql = `SELECT * FROM danhgiamathang dg, khachhang kh WHERE dg.MaKH = kh.MaKH AND ` + DieuKien + ` ORDER BY mamathang`;
            const rows = await mysqlconnect.load(sql);
            return rows;
        } catch (error) {
            console.log("Error Model: Danhgia: SelectAll ", error);
        }
    },
    DeleteOne: async (MaDanhGia) => {
        try {
            const sql = `DELETE FROM danhgiamathang WHERE MaDanhGia = ${MaDanhGia}`;
            const rows = await mysqlconnect.load(sql);
            return rows;
        } catch (error) {
            console.log("Error Model: HoaDon: DeleteOne ", error);
        }
    },

};
