import { Track } from "./track.js";

export const trackMongoStore = {
  async getAllTracks() {
    const tracks = await Track.find().lean();
    return tracks;
  },

  async addTrack(playlistId, track) {
    track.playlistid = playlistId;
    const newTrack = new Track(track);
    const trackObj = await newTrack.save();
    return this.getTrackById(trackObj._id);
  },

  async getTracksByPlaylistId(id) {
    const tracks = await Track.find({ playlistid: id }).lean();
    return tracks;
  },

  async getTrackById(id) {
    const track = await Track.findOne({ _id: id }).lean();
    return track;
  },

  async deleteTrack(id) {
    await Track.deleteOne({ _id: id });
  },

  async deleteAllTracks() {
    await Track.deleteMany({});
  },

  async updateTrack(track, updatedTrack) {
    track.title = updatedTrack.title;
    track.artist = updatedTrack.artist;
    track.duration = updatedTrack.duration;
    await track.save();
  },
};
