import { usersApi } from "./api/users-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/userApi", config: usersApi.find },
  { method: "POST", path: "/api/userApi", config: usersApi.create },
  { method: "DELETE", path: "/api/userApi", config: usersApi.deleteAll },
  { method: "GET", path: "/api/userApi/{id}", config: usersApi.findOne },
];
