var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Vision from "@hapi/vision";
import Hapi from "@hapi/hapi";
import Cookie from "@hapi/cookie";
import dotenv from "dotenv";
import path from "path";
import Joi from "joi";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { apiRoutes } from "./api-routes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const result = dotenv.config();
if (result.error) {
    console.log(result.error.message);
    process.exit(1);
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = Hapi.server({
            port: 3000,
            host: "localhost",
        });
        yield server.register(Vision);
        yield server.register(Cookie);
        server.validator(Joi);
        server.views({
            engines: {
                hbs: Handlebars,
            },
            relativeTo: __dirname,
            path: "./views",
            layoutPath: "./views/layouts",
            partialsPath: "./views/partials",
            layout: true,
            isCached: false,
        });
        server.auth.strategy("session", "cookie", {
            cookie: {
                name: process.env.cookie_name,
                password: process.env.cookie_password,
                isSecure: false,
            },
            redirectTo: "/",
            validateFunc: accountsController.validate,
        });
        server.auth.default("session");
        db.init("mongo");
        server.route(webRoutes);
        server.route(apiRoutes);
        yield server.start();
        console.log("Server running on %s", server.info.uri);
    });
}
process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});
init();
