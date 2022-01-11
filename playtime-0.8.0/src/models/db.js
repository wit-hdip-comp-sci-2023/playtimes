// import { userMemStore } from "./mem/user-mem-store.ts";
// import { playlistMemStore } from "./mem/playlist-mem-store.ts";
// import { trackMemStore } from "./mem/track-mem-store.ts";

// import { userJsonStore } from "./json/user-json-store.ts";
// import { playlistJsonStore } from "./json/playlist-json-store.js";
// import { trackJsonStore } from "./json/track-json-store.js";

import { userMongoStore } from "./mongo/user-mongo-store.js";
import { playlistMongoStore } from "./mongo/playlist-mongo-store.js";
import { initMongo } from "./mongo/init.js";
import { trackMongoStore } from "./mongo/track-mongo-store.js";

export const db = {
  userStore: null,
  playlistStore: null,
  trackStore: null,

  async seed() {
    const user = await this.userStore.addUser({
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
    });
    const playlist = this.playlistStore.addPlaylist({
      userid: user._id,
      title: "Beethoven Sonatas",
    });
  },

  init() {
    this.userStore = userMongoStore;
    this.playlistStore = playlistMongoStore;
    this.trackStore = trackMongoStore;
    initMongo();
    this.seed();
  },
};
