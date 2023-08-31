import mysql from "mysql2"

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Alex1405',
    database: 'UTRAVEL'
}

 export const connection = mysql.createConnection(dbConfig)

connection.connect((err) => {
    if (err) {
        console.log('Error ca la bbdd')
        return
    } else {
        console.log('Conexion establecida')
    }
})

