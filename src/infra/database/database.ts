import mssql from 'mssql'

const pool = new mssql.ConnectionPool({
    server: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    options: {
        enableArithAbort: true,
        encrypt: false,
    },
})

export default pool
