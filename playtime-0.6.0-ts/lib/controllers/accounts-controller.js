var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
export const accountsController = {
    index: {
        auth: false,
        handler: function (request, h) {
            return h.view("main", { title: "Welcome to Playlist" });
        },
    },
    showSignup: {
        auth: false,
        handler: function (request, h) {
            return h.view("signup-view", { title: "Sign up for Playlist" });
        },
    },
    signup: {
        auth: false,
        validate: {
            payload: UserSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
            },
        },
        handler: function (request, h) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = request.payload;
                yield db.userStore.addUser(user);
                return h.redirect("/");
            });
        },
    },
    showLogin: {
        auth: false,
        handler: function (request, h) {
            return h.view("login-view", { title: "Login to Playlist" });
        },
    },
    login: {
        auth: false,
        validate: {
            payload: UserCredentialsSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
            },
        },
        handler: function (request, h) {
            return __awaiter(this, void 0, void 0, function* () {
                const { email, password } = request.payload;
                const user = yield db.userStore.getUserByEmail(email);
                if (!user || user.password !== password) {
                    return h.redirect("/");
                }
                request.cookieAuth.set({ id: user._id });
                return h.redirect("/dashboard");
            });
        },
    },
    logout: {
        handler: function (request, h) {
            return h.redirect("/");
        },
    },
    validate(request, session) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db.userStore.getUserById(session.id);
            if (!user) {
                return { valid: false };
            }
            return { valid: true, credentials: user };
        });
    },
};
