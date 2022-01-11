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
import { trackMemStore } from "./track-mem-store.js";
let playlists = [];
export const playlistMemStore = {
    getAllPlaylists() {
        return __awaiter(this, void 0, void 0, function* () {
            return playlists;
        });
    },
    addPlaylist(playlist) {
        return __awaiter(this, void 0, void 0, function* () {
            playlist._id = v4();
            playlists.push(playlist);
            return playlist;
        });
    },
    getPlaylistById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = playlists.find((playlist) => playlist._id === id);
            if (list) {
                list.tracks = yield trackMemStore.getTracksByPlaylistId(list._id);
                return list;
            }
            return null;
        });
    },
    getUserPlaylists(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            return playlists.filter((playlist) => playlist.userid === userid);
        });
    },
    deletePlaylistById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = playlists.findIndex((playlist) => playlist._id === id);
            if (index !== -1)
                playlists.splice(index, 1);
        });
    },
    deleteAllPlaylists() {
        return __awaiter(this, void 0, void 0, function* () {
            playlists = [];
        });
    }
};
