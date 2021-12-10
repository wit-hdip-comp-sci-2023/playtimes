import { assert } from "chai";
import * as fixtures from "./fixtures.json";
import { playtimeService } from "./playtime-service.js";
import { isSubset } from "./test-utils.js";

suite("Playlist API tests", () => {
  const { maggie, beethoven, testPlaylists } = fixtures.default;
  let user = null;

  setup(async () => {
    await playtimeService.deleteAllPlaylists();
    await playtimeService.deleteAllUsers();
    user = await playtimeService.createUser(maggie);
    beethoven.userid = user._id;
  });

  teardown(async () => {});

  test("create playlist", async () => {
    const returnedPlaylist = await playtimeService.createPlaylist(beethoven);
    assert.isNotNull(returnedPlaylist);
    assert(isSubset(beethoven, returnedPlaylist), "testUser must be subset of returned user");
  });

  test("delete a playlist", async () => {
    const playlist = await playtimeService.createPlaylist(beethoven);
    const response = await playtimeService.deletePlaylist(playlist._id);
    assert.equal(response.status, 204);
    try {
      const returnedPlaylist = await playtimeService.getPlaylist(playlist.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Playlist with this id", "Incorrect Response Message");
    }
  });

  test("create multiple playlists", async () => {
    for (let i = 0; i < testPlaylists.length; i += 1) {
      testPlaylists[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createPlaylist(testPlaylists[i]);
    }
    let returnedLists = await playtimeService.getAllPlaylists();
    assert.equal(returnedLists.length, testPlaylists.length);
    await playtimeService.deleteAllPlaylists();
    returnedLists = await playtimeService.getAllPlaylists();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant playlist", async () => {
    try {
      const response = await playtimeService.deletePlaylist("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Playlist with this id", "Incorrect Response Message");
    }
  });
});
