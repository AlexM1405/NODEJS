import { randomUUID } from "crypto"
import { readJSON } from "../../utils.js"


const User = readJSON("./User.json")

export class UserModel {
  static async getbyID({id}) {
    return User.find(user => user.id === id);
  }
 
  static async create({ input }) {
    const newUser = {
       id: randomUUID(),
       ...input
     }
     User.push(newUser);
     return newUser;
  }
 
  static async delete({id}){
    const UserIndex = User.findIndex(user => user.id === id);
    if (UserIndex === -1) return false;
 
    User.splice(UserIndex, 1);
    return true;
  }
 
  static async update({id, input }) {
    const UserIndex = User.findIndex(user => user.id === id);
    if (UserIndex === -1) return false;
 
    User[UserIndex] = {
         ...User[UserIndex],
         ...input
     }
    return User[UserIndex];
  } 
 }