import { assert } from "chai";
import { db } from "../src/models/db.js";
import { maggie, testUsers } from "./fixtures.js";
import { isSubset } from "./test-utils.js";

suite("User API tests", () => {

  setup(async () => {
    db.init();
    await db.userStore.deleteAllUsers();
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await db.userStore.addUser(maggie);
    assert(isSubset(maggie, newUser), "testUser must be subset of returned user");
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.userStore.addUser(testUsers[i]);
    }
    let returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await db.userStore.deleteAll();
    returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

  test("get a user - successes", async () => {
    const user = await db.userStore.addUser(maggie);
    const returnedUser1 = await db.userStore.getUserById(user._id);
    assert.deepEqual(user, returnedUser1);
    const returnedUser2 = await db.userStore.getUserByEmail(user.email);
    assert.deepEqual(user, returnedUser2);
  });

  test("get a user - failures", async () => {
    const noUserWithId = await db.userStore.getUserById("123");
    assert.isNull(noUserWithId);
    const noUserWithEmail = await db.userStore.getUserById("no@one.com");
    assert.isNull(noUserWithEmail);
  });

  test("get a user - bad params", async () => {
    let nullUser = await db.userStore.getUserById("");
    assert.isNull(nullUser);
    nullUser = await db.userStore.getUserById("");
    assert.isNull(nullUser);
    nullUser = await db.userStore.getUserById();
    assert.isNull(nullUser);
    nullUser = await db.userStore.getUserById();
    assert.isNull(nullUser);
  });

  test("delete One User - success", async () => {
    for (let i = 0; i < users.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.userStore.addUser(users[i]);
    }
    await db.userStore.deleteUserById(users[0]._id);
    const returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, users.length - 1);
    const deletedUser = await db.userStore.getUserById(users[0]._id);
    assert.isNull(deletedUser);
  });

  test("delete One User - fail", async () => {
    for (let i = 0; i < users.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.userStore.addUser(users[i]);
    }
    let allUsers = await db.userStore.getAllUsers();
    assert.equal(users.length, allUsers.length);
    await db.userStore.deleteUserById("bad-id");
    allUsers = await db.userStore.getAllUsers();
    assert.equal(users.length, allUsers.length);
  });
});
