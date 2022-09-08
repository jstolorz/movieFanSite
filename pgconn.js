const express = require('express')
const PoolClass = require('pg').Pool

const app = express()

const pool = new PoolClass({
    user: 'postgres',
    host: 'localhost',
    database: 'db_name',
    port: 5432,
    password: ''
})

app.get('/pg',(req,res) => {

    pool.query('select * from test where id > $1',[36],(error,dbResponse) =>{
        console.log((dbResponse.rows))
    })

    pool.end()

})



