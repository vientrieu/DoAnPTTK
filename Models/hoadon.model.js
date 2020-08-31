let mysqlconnect = require("../database/mysql");

module.exports = {
  SelectAll: async () => {
    try {
      const sql = `SELECT * FROM hoadon`;
      const rows = await mysqlconnect.load(sql);
      return await Promise.all(
        rows.map(async (item) => {
          const sql2 = `SELECT sum(DonGia*SoLuong) as count FROM chitiethoadon  where MaHoaDon = ${item.MaHoaDon}`;
          const s = await mysqlconnect.load(sql2);
          console.log({ ...item, TongTien: s[0].count });
          return { ...item, TongTien: s[0].count };
        })
      );
    } catch (error) {
      console.log("Error Model: HoaDon: selectAll ", error);
    }
  },
  SelectOne1: async (MaHD) => {
    try {
      const sql = `SELECT c.MaHoaDon, m.TenMaThang, c.DonGia, c.SoLuong, c.TinhTrangMatHang, c.MaMatHang FROM chitiethoadon c, mathang m WHERE c.MaHoaDon = ${MaHD} and m.MaMatHang= c.MaMatHang`;
      const rows = await mysqlconnect.load(sql);
      return rows;
    } catch (error) {
      console.log("Error Model: HoaDon: selectOne ", error);
    }
  },
  SelectOne: async (MaHD) => {
    try {
      const sql = `SELECT c.MaHoaDon, m.TenMaThang, c.DonGia, c.SoLuong, c.TinhTrangMatHang, c.MaMatHang FROM chitiethoadon c, mathang m WHERE c.MaHoaDon = ${MaHD} and m.MaMatHang= c.MaMatHang`;
      const rows = await mysqlconnect.load(sql);
      return rows;
    } catch (error) {
      console.log("Error Model: HoaDon: selectOne ", error);
    }
  },
  UpdateThanhToan: async (MaHD, HinhThucThanhToan) => {
    try {
      const sql = `UPDATE hoadon SET HinhThucThanhToan = '${HinhThucThanhToan}', ThongTinXacNhanDonHang = 'Đã Thanh Toán' WHERE MaHoaDon = ${MaHD}`;
      const rows = await mysqlconnect.load(sql);
      return rows;
    } catch (error) {
      console.log("Error Model: HoaDon: XacNhanThanhToan ", error);
    }
  },
  DeleteOrder: async (MaHD) => {
    try {
      const sql1 = `DELETE from ChiTietHoaDon where MaHoaDon = ${MaHD}`;
      await mysqlconnect.load(sql1);
      const sql = `DELETE from HoaDon where MaHoaDon = ${MaHD}`;
      const rows = await mysqlconnect.load(sql);
      return rows;
    } catch (error) {
      console.log("Error Model: HoaDon: selectAll ", error);
    }
  },
  DeleteDetails: async (MaHD, MaMatHang) => {
    try {
      const sql = `DELETE from ChiTietHoaDon where MaHoaDon = ${MaHD} and MaMatHang = ${MaMatHang}`;
      const rows = await mysqlconnect.load(sql);
      return rows;
    } catch (error) {
      console.log("Error Model: HoaDon: selectAll ", error);
    }
  },
  ReturnProduct: async ({ MaMatHang, NgayTra, LyDo, MaDH }) => {
    try {
      const sql = `INSERT INTO chitietdontrahangkhachhang (MaMatHangTra, MaDonDatHang, LyDo, NgayTra) values (${MaMatHang}, ${MaDH}, '${LyDo}', ${NgayTra})`;
      const sql1 = `UPDATE chitiethoadon SET TinhTrangMatHang = 'da tra' where MaMatHang = ${MaMatHang} and MaHoaDon = ${MaDH}`;
      const rows = await mysqlconnect.load(sql);
      const rows1 = await mysqlconnect.load(sql1);
      return rows1;
    } catch (error) {
      console.log(error);
    }
  },
};
