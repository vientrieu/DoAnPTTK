const mysql = require("mysql");

var con = mysql.createConnection({
    database: 'pttkhttt1',
    host: "localhost",
    user: "root",
    password: "123456789"
});
con.connect(err => {
    if (err) {
     console.log(err);
    }
});
exports.load = sql => {
    return new Promise((resole, reject) => {

        con.query(sql, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            // console.log(results);
            resole(results);
        });
    });
};

exports.add = (tbName, entity) => {
    return new Promise((resole, reject) => {
        const sql = `INSERT INTO ${tbName} SET ?`;
        con.query(sql, entity, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            console.log(`results: ----`, results);
            resole(results.insertId);
        });
    });
};
exports.add1 = (tbName, entity) => {
    return new Promise((resole, reject) => {
        const con = createConnection();
        con.connect(err => {
            if (err) {
                reject(err);
            }
        });
        const sql = `INSERT INTO ${tbName} SET ?`;
        con.query(sql, entity, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            //console.log(`results: ----`, results);
            resole(results.insertId);
        });
        con.end();
    });
};
exports.del = (tbName, idField, id) => {
    return new Promise((resole, reject) => {
        let sql = "DELETE FROM ?? WHERE ?? = ?";
        const params = [tbName, idField, id];
        sql = mysql.format(sql, params);
        con.query(sql, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resole(results.affectedRows);
            }
        });
    });
};

exports.update = (tbName, idField, entity) => {
    return new Promise((resole, reject) => {
        const id = entity[idField];
        delete entity[idField];
        let sql = `UPDATE ${tbName} SET ? WHERE ${idField} = ${id}`;
        con.query(sql, entity, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resole(results.changedRows);
            }
        });
    });
};
exports.errorHandle = promise => {
    return promise.then(data => [data, undefined]).catch(err => [undefined, err]);
};