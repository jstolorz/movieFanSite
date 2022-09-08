const mysql = require('mysql')

const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'bob',
    password        : 'secret',
    database        : 'my_db'
});

pool.query('select * from test', function (error, results, fields) {
    if (error) throw error;
    console.log(results);
})

module.exports = {
    query: (queryText,params,callback) =>{
        return pool.query(queryText,params,callback)
    }
}

