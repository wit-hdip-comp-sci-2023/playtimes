import { userMemStore } from "./mem/user-mem-store.js";
import { playlistMemStore } from "./mem/playlist-mem-store.js";
import { trackMemStore } from "./mem/track-mem-store.js";
import { StoreType } from "./stores-types.js";
// import { userJsonStore } from "./json/user-json-store.ts";
// import { playlistJsonStore } from "./json/playlist-json-store.js";
// import { trackJsonStore } from "./json/track-json-store.js";
// import { userMongoStore } from "./mongo/user-mongo-store.js";
// import { playlistMongoStore } from "./mongo/playlist-mongo-store.js";
// import { trackMongoStore } from "./mongo/track-mongo-store.js";
// import { connectMongo } from "./mongo/connect.js";
import {UserStore} from "./stores-types.js";

export const db = {
  userStore: UserStore,
  playlistStore: null,
  trackStore: null,

  init(storeType:StoreType) {
    switch (storeType) {
      // case "json" :
      //   this.userStore = userJsonStore;
      //   this.playlistStore = playlistJsonStore;
      //   this.trackStore = trackJsonStore;
      //   break;
      // case "mongo" :
      //   this.userStore = userMongoStore;
      //   this.playlistStore = playlistMongoStore;
      //   this.trackStore = trackMongoStore;
      //   connectMongo();
      //   break;
      default :
        this.userStore = userMemStore;
        this.playlistStore = playlistMemStore;
        this.trackStore = trackMemStore;
    }
  }
};
