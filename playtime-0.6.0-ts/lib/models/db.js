import { userMemStore } from "./mem/user-mem-store.js";
import { playlistMemStore } from "./mem/playlist-mem-store.js";
import { trackMemStore } from "./mem/track-mem-store.js";
export const db = {
    userStore: UserStore,
    playlistStore: null,
    trackStore: null,
    init(storeType) {
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
            default:
                this.userStore = userMemStore;
                this.playlistStore = playlistMemStore;
                this.trackStore = trackMemStore;
        }
    }
};
