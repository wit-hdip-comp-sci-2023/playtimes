import { assert } from "chai";
import { playtimeService } from "./playtime-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie } from "../fixtures.js";

suite("Authentication API tests", function() {

  setup(async function() {
    await playtimeService.createUser(maggie);
    await playtimeService.authenticate(maggie);
    await playtimeService.deleteAllUsers();
  });

  test("authenticate", async function() {
    const returnedUser = await playtimeService.createUser(maggie);
    const response = await playtimeService.authenticate(maggie);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async function() {
    const returnedUser = await playtimeService.createUser(maggie);
    const response = await playtimeService.authenticate(maggie);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });
});
