const db = require("../database/mysql"),
    run = db.errorHandle;
const config = require("../config/default.json");

module.exports = {
    allQuangcaoNguoiDung: async () => {
        try {
            const sql = `select * from QuangCaoNguoiDung,KhachHang where QuangCaoNguoiDung.MaKH=KhachHang.MaKH;`;
            const rows = await db.load(sql);

            return rows;
        } catch (error) {
            console.log("Error Model: Product: all", error);
        }
    },
    GetThongQCKH: async (MaKH) => {
        try {
            const sql = `SELECT * FROM QuangCaoNguoiDung,CacQuangCaoGuiDi where MaKH= ${MaKH} and CacQuangCaoGuiDi.MaQuangCaoGuiDi=QuangCaoNguoiDung.MaQuangCaoGuiDi`;
            const rows = await db.load(sql);
            return rows;
        } catch (error) {
            console.log("Error Model: HoaDon: selectOne ", error);
        }
    },
    allLoaiHang: async () => {
        try {
            const sql = `select * from LoaiHang`;
            const rows = await db.load(sql);

            return rows;
        } catch (error) {
            console.log("Error Model: Product: all", error);
        }

    },
    addQC: async entity => {
        const [id, err] = await run(db.add('CacQuangCaoGuiDi', entity));
        if (err) {
            console.log("Error Model: Category: add", err);
            throw err;
        }
        return id;
    },
};