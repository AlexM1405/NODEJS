
import { randomUUID } from "crypto"
import bcrypt from 'bcrypt';


export class UserModel {
  static async getall ({username}){
    if (username) {
      return user.filter(
        user => user.filter(user => user.username == ['username'])
      )}
      return user
  }
  static async getbyid ({id}) {
    user => user.find(user => user.id == ['id'])
    return user
  }
  static async create({ username, password, email,}) {
    const newuser = {
      id: randomUUID(),
      username: await bcrypt.hash(username, 10),
      password: await bcrypt.hash(password, 10),
      Email: email,
    }
    return await user.push(newuser);
  }
  static async delete({id}){
    const UserIndex = user.findIndex(user => user.id === id)
    if (user === -1) return false

    user.splice(UserIndex, 1)
    return true;
}
static async update({id, username, password, email, }) {
    const UserIndex = user.findIndex(user => user.id === id)
    if (UserIndex === -1) return false 

    user[UserIndex] = {
        ...user[UserIndex],
        ...bcrypt.hash(username, 10),
        ...bcrypt.hash(password, 10),
        ...email,
    }
  return user[UserIndex]
}
}