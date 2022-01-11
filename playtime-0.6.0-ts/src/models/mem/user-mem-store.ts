import { v4 } from "uuid";
import { User, UserStore } from "../stores-types.js";

let users: User[] = [];

export const userMemStore : UserStore = {
  async getAllUsers() {
    return users;
  },

  async addUser(user: User) : Promise<User> {
    user._id = v4();
    users.push(user);
    return user;
  },

  async getUserById(id: string): Promise<User>  {
    return users.find((user) => user._id === id);
  },

  async getUserByEmail(email: string) {
    return users.find((user) => user.email === email);
  },

  async deleteUserById(id: string): Promise<User>  {
    const index = users.findIndex((user) => user._id === id);
    users.splice(index, 1);
  },

  async deleteAll() {
    users = [];
  }
};
