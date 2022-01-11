var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 } from "uuid";
let users = [];
export const userMemStore = {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return users;
        });
    },
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user._id = v4();
            users.push(user);
            return user;
        });
    },
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return users.find((user) => user._id === id);
        });
    },
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return users.find((user) => user.email === email);
        });
    },
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = users.findIndex((user) => user._id === id);
            users.splice(index, 1);
        });
    },
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            users = [];
        });
    }
};
