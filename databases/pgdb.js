const PoolClass = require('pg').Pool

const pool = new PoolClass({
    user: 'postgres',
    host: 'localhost',
    database: 'db_name',
    port: 5432,
    password: ''
})

module.exports = {
    query: (queryText,params,callback) =>{
       return pool.query(queryText,params,callback)
    }
}



