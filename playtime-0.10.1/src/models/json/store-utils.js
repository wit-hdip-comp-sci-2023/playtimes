import { JSONPreset } from "lowdb/node";

export const db = await JSONPreset("src/models/json/db.json", {
  users: [],
  playlists: [],
  tracks: [],
});
