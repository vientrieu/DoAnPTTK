let mysqlconnect = require('../database/mysql');
module.exports = {
    selectAll: async () => {
        try {
            const sql = `SELECT * FROM hoadon`;
            const rows = await mysqlconnect.load(sql);
            console.log(rows);
            return rows;
        } catch (error) {
            console.log("Error Model: HoaDon: selectAll", error);
        }
    },
};
