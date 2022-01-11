import { assert } from "chai";
import { db } from "../../src/models/db.ts";
import { testPlaylists, mozart } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Track Model tests", () => {

  setup(async () => {
    db.init("mongo");
  });

  test("create a track", async () => {
  });
});
