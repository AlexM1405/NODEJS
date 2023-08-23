import mysql from "mysql2"

const dbConfig = {
    host: 'localhost',
    port: 4888,
    user: 'Utravel1',
    password: 'Alex1405',
    database: 'UTRAVELDB'
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

