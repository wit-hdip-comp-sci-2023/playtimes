import { UserApi } from "./api/user-api.js";
import { PlaylistApi } from "./api/playlist-api.js";
import { TrackApi } from "./api/track-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: UserApi.find },
  { method: "POST", path: "/api/users", config: UserApi.create },
  { method: "DELETE", path: "/api/users", config: UserApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: UserApi.findOne },

  { method: "POST", path: "/api/playlists", config: PlaylistApi.create },
  { method: "DELETE", path: "/api/playlists", config: PlaylistApi.deleteAll },
  { method: "GET", path: "/api/playlists", config: PlaylistApi.find },
  { method: "GET", path: "/api/playlists/{id}", config: PlaylistApi.findOne },
  { method: "DELETE", path: "/api/playlists/{id}", config: PlaylistApi.deleteOne },

  { method: "GET", path: "/api/tracks", config: TrackApi.find },
  { method: "GET", path: "/api/tracks/{id}", config: TrackApi.findOne },
  { method: "POST", path: "/api/playlists/{id}/tracks", config: TrackApi.create },
  { method: "DELETE", path: "/api/tracks", config: TrackApi.deleteAll },
  { method: "DELETE", path: "/api/tracks/{id}", config: TrackApi.deleteOne },
];
