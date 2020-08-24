const db = require("../database/mysql"),
    run = db.errorHandle;
const config = require("../config/default.json");

module.exports = {

    allNhaCungCap: async () => {
        try {
            const sql = `select* from NhaCungCap;`;
            const rows = await db.load(sql);

            return rows;
        } catch (error) {
            console.log("Error Model: NhaCungCap: all", error);
        }
    },
    allDonNhapHang: async () => {
        try {
            const sql = `select* from DonNhapHang,NhanVien,NhaCungCap where DonNhapHang.MaNhanVienNhapHang=NhanVien.MaNhanVien and DonNhapHang.MaNhaCungCap=NhaCungCap.MaNCC ;`;
            const rows = await db.load(sql);

            return rows;
        } catch (error) {
            console.log("Error Model: DonNhapHang: all", error);
        }
    },
    allDonTraHang: async () => {
        try {
            const sql = `select* from DonTraHang,NhanVien,NhaCungCap where DonTraHang.MaNhanVienTraHang=NhanVien.MaNhanVien and DonTraHang.MaNhaCungCap=NhaCungCap.MaNCC ;`;
            const rows = await db.load(sql);

            return rows;
        } catch (error) {
            console.log("Error Model: DonNhapHang: all", error);
        }
    },
    allNhanVien: async () => {
        try {
            const sql = `select * from NhanVien`;
            const rows = await db.load(sql);

            return rows;
        } catch (error) {
            console.log("Error Model: NhanVien: all", error);
        }
    },
    allMatHang: async () => {
        try {
            const sql = `select * from MatHang`;
            const rows = await db.load(sql);
            return rows;
        } catch (error) {
            console.log("Error Model: MatHang: all", error);
        }
    },
    addDonNhapHang: async entity => {
        const [id, err] = await run(db.add('DonNhapHang', entity));
        if (err) {
            console.log("Error Model: Category: add", err);
            throw err;
        }
        return id;
    },
    addDonTraHang: async entity => {
        const [id, err] = await run(db.add('DonTraHang', entity));
        if (err) {
            console.log("Error Model: Category: add", err);
            throw err;
        }
        return id;
    },
    addNhaCungCap: async entity => {
        const [id, err] = await run(db.add('NhaCungCap', entity));
        if (err) {
            console.log("Error Model: Nha cung cap: add", err);
            throw err;
        }
        return id;
    },
    addChiTietDonDatHang: async entity => {
        const [id, err] = await run(db.add('ChiTietDonNhapHang', entity));
        if (err) {
            console.log("Error Model: Nha cung cap: add", err);
            throw err;
        }
        return id;
    },
    addChiTietDonTraHang: async entity => {
        const [id, err] = await run(db.add('ChiTietDonTraHang', entity));
        if (err) {
            console.log("Error Model: Nha cung cap: add", err);
            throw err;
        }
        return id;
    },
    checkChiTietDonDatHang: async (MaDonNhapHang, MaMatHang) => {
        try {
            const sql = `select * from ChiTietDonNhapHang where MaDonNhapHang=${MaDonNhapHang} and MaMatHang=${MaMatHang}`;
            const rows = await db.load(sql);
            if (rows.length == 0)
                return true;
            else
                return false;
        } catch (error) {
            console.log("Error Model: MatHang: all", error);
        }
    },
    checkChiTietDonTraHang: async (MaDonTraHang, MaMatHang) => {
        try {
            const sql = `select * from ChiTietDonTraHang where MaDonTraHang=${MaDonTraHang} and MaMatHang=${MaMatHang}`;
            const rows = await db.load(sql);
            if (rows.length == 0)
                return true;
            else
                return false;
        } catch (error) {
            console.log("Error Model: MatHang: all", error);
        }
    },
    ChiTietMatHangbyDonTraHang: async (MaDonNhapHang) => {
        try {
            const sql = `select * from ChiTietDonTraHang, MatHang where MaDonTraHang=${MaDonNhapHang} and MatHang.MaMatHang=ChiTietDonTraHang.MaMatHang `;
            const rows = await db.load(sql);
            return rows;
        } catch (error) {
            console.log("Error Model: MatHang: all", error);
        }
    },
    ChiTietMatHangbyDonHang: async (MaDonNhapHang) => {
        try {
            const sql = `select * from ChiTietDonNhapHang, MatHang where MaDonNhapHang=${MaDonNhapHang} and MatHang.MaMatHang=ChiTietDonNhapHang.MaMatHang `;
            const rows = await db.load(sql);
            return rows;
        } catch (error) {
            console.log("Error Model: MatHang: all", error);
        }
    },
};