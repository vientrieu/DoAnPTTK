const db = require("../database/mysql"),
    run = db.errorHandle;
const config = require("../config/default.json");

const tbName = `Products`;
const idField = `ProID`;
module.exports = {
    allQuangcaoNguoiDung: async() => {
        try {
            const sql = `select * from QuangCaoNguoiDung,KhachHang where QuangCaoNguoiDung.MaKH=KhachHang.MaKH;`;
            const rows = await db.load(sql);
         
            return rows;
        } catch (error) {
            console.log("Error Model: Product: all", error);
        }
    },
};