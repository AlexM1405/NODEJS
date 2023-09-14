import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

export const UserModel = Sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  Username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const hash = bcrypt.hashSync(value, 10);
      this.setDataValue('password', hash);
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
}, {
  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  }
});

UserModel.sync({ alter: true })
  .then(() => console.log('Table of User Synchronized'))
  .catch((error) => console.log(error));