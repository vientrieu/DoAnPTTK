let mysqlconnect = require('../database/mysql');
run = mysqlconnect.errorHandle;
module.exports = {
    Add: async (object) => {
        const [id, err] = await run(mysqlconnect.add('PhieuThanhToanThe', object));
        if (err) {
            console.log("Error Model: PhieuThanhToanThe: Add", err);
            throw err;
        }
        return id;
    }
};
