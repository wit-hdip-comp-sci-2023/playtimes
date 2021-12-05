import { assert } from "chai";
import { db } from "../src/models/db.js";
import * as fixtures from "./fixtures.json";
import { isSubset } from "./test-utils.js";

suite("User API tests", () => {
  const { users } = fixtures.default;
  const { maggie } = fixtures.default;

  setup(async () => {
    db.init();
    db.userStore.deleteAll();
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await db.userStore.addUser(maggie);
    assert(isSubset(maggie, newUser), "testUser must be subset of returned user");
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    for (let i = 0; i < users.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.userStore.addUser(users[i]);
    }
    let returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await db.userStore.deleteAll();
    returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

  test("get a user", async () => {
    // const user = await playtimeService.createUser(maggie);
    // const returnedUser = await playtimeService.getUser(user._id);
    // assert.deepEqual(user, returnedUser);
  });
});
