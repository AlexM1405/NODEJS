import { Sequelize } from 'sequelize'

export const dbConnection = new Sequelize('test-uade', 'root', 'Utravel1',
{
    host: 'localhost',
    dialect: 'mysql'
})

