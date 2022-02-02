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
import { JSONFile, Low } from "lowdb";
const adapter = new JSONFile("./src/models/json/userApi.json");
const db = new Low(adapter);
export const userJsonStore = {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db.read();
            if (db.data) {
                return db.data.users;
            }
            else {
                return [];
            }
        });
    },
    addUser(user) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield db.read();
            user._id = v4();
            (_a = db === null || db === void 0 ? void 0 : db.data) === null || _a === void 0 ? void 0 : _a.users.push(user);
            yield db.write();
            return user;
        });
    },
    getUserById(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield db.read();
            let u = (_a = db === null || db === void 0 ? void 0 : db.data) === null || _a === void 0 ? void 0 : _a.users.find((user) => user._id === id);
            if (u === undefined) {
                return null;
            }
            else {
                return u;
            }
        });
    },
    getUserByEmail(email) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield db.read();
            let u = (_a = db === null || db === void 0 ? void 0 : db.data) === null || _a === void 0 ? void 0 : _a.users.find((user) => user.email === email);
            if (u === undefined) {
                return null;
            }
            else {
                return u;
            }
        });
    },
    deleteUserById(id) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            yield db.read();
            const index = (_a = db === null || db === void 0 ? void 0 : db.data) === null || _a === void 0 ? void 0 : _a.users.findIndex((user) => user._id === id);
            if (index !== -1) { // @ts-ignore
                (_b = db === null || db === void 0 ? void 0 : db.data) === null || _b === void 0 ? void 0 : _b.users.splice(index, 1);
            }
            yield db.write();
        });
    },
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            db.data.users = [];
            yield db.write();
        });
    }
};
