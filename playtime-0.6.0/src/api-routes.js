import { Users } from "./api/users.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: Users.find },
  { method: "POST", path: "/api/users", config: Users.create },
  { method: "DELETE", path: "/api/users", config: Users.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: Users.findOne },
];
