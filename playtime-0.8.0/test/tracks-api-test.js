import { assert } from "chai";
import { isSubset } from "./test-utils.js";
import * as fixtures from "./fixtures.json";
import { playtimeService } from "./playtime-service.js";

suite("Track API tests", () => {
  const { maggie, beethoven, sonataNo3, testTracks } = fixtures.default;
  let user = null;
  let beethovenSonatas = null;

  setup(async () => {
    await playtimeService.deleteAllPlaylists();
    await playtimeService.deleteAllUsers();
    await playtimeService.deleteAllTracks();
    user = await playtimeService.createUser(maggie);
    beethoven.userid = user._id;
    beethovenSonatas = await playtimeService.createPlaylist(beethoven);
  });

  teardown(async () => {});

  test("create track", async () => {
    const returnedTrack = await playtimeService.createTrack(beethovenSonatas._id, sonataNo3);
    assert(isSubset(sonataNo3, returnedTrack), "returned track must be a superset of new track");
  });

  test("create Multiple tracks", async () => {
    for (let i = 0; i < testTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createTrack(beethovenSonatas._id, testTracks[i]);
    }
    const returnedTracks = await playtimeService.getAllTracks();
    assert.equal(returnedTracks.length, testTracks.length);
    for (let i = 0; i < returnedTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const track = await playtimeService.getTrack(returnedTracks[i]._id);
      assert(isSubset(track, returnedTracks[i]), "returned track must be a superset of new track");
    }
  });

  test("Delete Tracks", async () => {
    for (let i = 0; i < testTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createTrack(beethovenSonatas._id, testTracks[i]);
    }
    let returnedTracks = await playtimeService.getAllTracks();
    assert.equal(returnedTracks.length, testTracks.length);
    for (let i = 0; i < returnedTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const track = await playtimeService.deleteTrack(returnedTracks[i]._id);
    }
    returnedTracks = await playtimeService.getAllTracks();
    assert.equal(returnedTracks.length, 0);
  });

  test("denormalised playlist", async () => {
    for (let i = 0; i < testTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createTrack(beethovenSonatas._id, testTracks[i]);
    }
    const returnedPlaylist = await playtimeService.getPlaylist(beethovenSonatas._id);
    assert.equal(returnedPlaylist.tracks.length, testTracks.length);
    for (let i = 0; i < testTracks.length; i += 1) {
      assert(isSubset(testTracks[i], returnedPlaylist.tracks[i]));
    }
  });
});
