const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const mongoUrl = 'mongodb://localhost:27017'

mongoClient.connect(mongoUrl, (error, databaseConn) => {
    const db = databaseConn.db('db_name')
    db.collection('col_name').find({}).toArray((queryError,colResult) =>{
        console.log(colResult)
    })
})

