import { v4 } from "uuid";
import { trackMemStore } from "./track-mem-store.js";
import { Track } from "./track-mem-store";
import { Playlist } from "../stores-types.js";


let playlists:Playlist[] = [];

export const playlistMemStore = {
  async getAllPlaylists() {
    return playlists;
  },

  async addPlaylist(playlist:Playlist) {
    playlist._id = v4();
    playlists.push(playlist);
    return playlist;
  },

  async getPlaylistById(id:string) {
    const list = playlists.find((playlist) => playlist._id === id);
    if (list) {
      list.tracks = await trackMemStore.getTracksByPlaylistId(list._id);
      return list;
    }
    return null;
  },

  async getUserPlaylists(userid:string) {
    return playlists.filter((playlist) => playlist.userid === userid);
  },

  async deletePlaylistById(id:string) {
    const index = playlists.findIndex((playlist) => playlist._id === id);
    if (index !== -1) playlists.splice(index, 1);
  },

  async deleteAllPlaylists() {
    playlists = [];
  }
};
