import {dbConnection } from "../../dbConnection.js"
import {DataTypes } from "sequelize"

 export const User = dbConnection.define("User", {
    name: {
      type: DataTypes.STRING,
      required: true,
    },
    password: {
      type: DataTypes.STRING,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      unique: true
    },
    id: {
      type: DataTypes.STRING,
      required: true,
      defaultValue: "USER_ID",
    },
  })

  User.sync({ alter: true })
  .then(() => {
    console.log("Tabla de usuarios sincronizada")
  })
  .catch((error) => console.log(error))