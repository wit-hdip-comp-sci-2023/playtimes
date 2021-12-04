import { Playlist } from "./playlist.js";
import { trackMongoStore } from "./track-mongo-store.js";

export const playlistMongoStore = {
  async getAllPlaylists() {
    const playlists = await Playlist.find().lean();
    return playlists;
  },

  async getPlaylistById(id) {
    const playlist = await Playlist.findOne({ _id: id }).lean();
    playlist.tracks = await trackMongoStore.getTracksByPlaylistId(playlist._id);
    return playlist;
  },

  async addPlaylist(playlist) {
    const newPlaylist = new Playlist(playlist);
    const playlistObj = await newPlaylist.save();
    return this.getPlaylistById(playlistObj._id);
  },

  async getUserPlaylists(id) {
    const playlist = await Playlist.find({ userid: id }).lean();
    return playlist;
  },

  async deletePlaylistById(id) {
    await Playlist.deleteOne({ _id: id });
  },

  async deleteAllPlaylists() {
    await Playlist.deleteMany({});
  },
};
