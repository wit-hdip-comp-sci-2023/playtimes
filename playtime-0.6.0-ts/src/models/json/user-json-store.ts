import { v4 } from "uuid";
import { JSONFile, Low } from "lowdb";
import { User, UserStore } from "../stores-types";

type Data = {
  users: User[] // Expect posts to be an array of strings
}
const adapter = new JSONFile<Data>("./src/models/json/users.json");
const db = new Low<Data>(adapter);

export const userJsonStore: UserStore = {
  async getAllUsers(): Promise<User[]> {
    await db.read();
    if (db.data) {
      return db.data.users;
    } else {
      return [];
    }
  },

  async addUser(user: User): Promise<User> {
    await db.read();
    user._id = v4();
    db?.data?.users.push(user);
    await db.write();
    return user;
  },

  async getUserById(id): Promise<User | null> {
    await db.read();
    let u: User | undefined = db?.data?.users.find((user) => user._id === id);
    if (u === undefined) {
      return null;
    } else {
      return u;
    }
  },

  async getUserByEmail(email): Promise<User | null> {
    await db.read();
    let u: User | undefined = db?.data?.users.find((user) => user.email === email);
    if (u === undefined) {
      return null;
    } else {
      return u;
    }
  },

  async deleteUserById(id) :Promise<void>{
    await db.read();
    const index = db?.data?.users.findIndex((user) => user._id === id);
    if (index !== -1) { // @ts-ignore
      db?.data?.users.splice(index, 1);
    }
    await db.write();
  },

  async deleteAll() :Promise<void>{
    // @ts-ignore
    db.data.users = [];
    await db.write();
  }
};
