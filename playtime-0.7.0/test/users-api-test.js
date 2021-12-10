import { assert } from "chai";

import { isSubset } from "./test-utils.js";
import * as fixtures from "./fixtures.json";
import { playtimeService } from "./playtime-service.js";

suite("User API tests", () => {
  const { users } = fixtures.default;
  const { maggie } = fixtures.default;

  setup(async () => {
    await playtimeService.deleteAllUsers();
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await playtimeService.createUser(maggie);
    assert(isSubset(maggie, newUser), "testUser must be subset of returned user");
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    for (let i = 0; i < users.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createUser(users[i]);
    }
    let returnedUsers = await playtimeService.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await playtimeService.deleteAllUsers();
    returnedUsers = await playtimeService.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

  test("get a user", async () => {
    const user = await playtimeService.createUser(maggie);
    const returnedUser = await playtimeService.getUser(user._id);
    assert.deepEqual(user, returnedUser);
  });
});
