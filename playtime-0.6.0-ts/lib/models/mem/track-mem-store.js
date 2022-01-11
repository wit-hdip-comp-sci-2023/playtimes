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
let tracks = [];
export const trackMemStore = {
    getAllTracks() {
        return __awaiter(this, void 0, void 0, function* () {
            return tracks;
        });
    },
    addTrack(playlistId, track) {
        return __awaiter(this, void 0, void 0, function* () {
            track._id = v4();
            track.playlistid = playlistId;
            tracks.push(track);
            return track;
        });
    },
    getTracksByPlaylistId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return tracks.filter((track) => track.playlistid === id);
        });
    },
    getTrackById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return tracks.find((track) => track._id === id);
        });
    },
    getPlaylistTracks(playlistId) {
        return __awaiter(this, void 0, void 0, function* () {
            return tracks.filter((track) => track.playlistid === playlistId);
        });
    },
    deleteTrack(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = tracks.findIndex((track) => track._id === id);
            tracks.splice(index, 1);
        });
    },
    deleteAllTracks() {
        return __awaiter(this, void 0, void 0, function* () {
            tracks = [];
        });
    },
    updateTrack(track, updatedTrack) {
        return __awaiter(this, void 0, void 0, function* () {
            track.title = updatedTrack.title;
            track.artist = updatedTrack.artist;
            track.duration = updatedTrack.duration;
        });
    }
};
