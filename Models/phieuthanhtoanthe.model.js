let mysqlconnect = require('../database/mysql');
module.exports = {
    Add: async (object) => {
        const [id, err] = await mysqlconnect.add('PhieuThanhToanThe', object);
        if (err) {
            console.log("Error Model: PhieuThanhToanThe: Add", err);
            throw err;
        }
        return id;
    }
};
