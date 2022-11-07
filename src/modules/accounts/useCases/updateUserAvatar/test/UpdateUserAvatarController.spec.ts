import request from "supertest";

import { LocalStorageProvider } from "@shared/container/providers/StorageProvider/implementations/LocalStorageProvider";
import { app } from "@shared/infra/http/app";
import { authenticateTestConnection } from "@utils/test_utilities/authenticateTestConnection";
import { closeConnection } from "@utils/test_utilities/connectionTest";

const testFile = "./assets/avatar_first_test_image.png";

let authorizationUserToken: string;

const localStorageProvider = new LocalStorageProvider();

describe("Update user avatar", () => {
  beforeAll(async () => {
    authorizationUserToken = await authenticateTestConnection();
  });

  afterAll(async () => {
    await closeConnection();
  });

  it("Should be able to add an user avatar", async () => {
    const response = await request(app)
      .patch("/users/avatar")
      .set({ Authorization: `Bearer ${authorizationUserToken}` })
      .attach("avatar", testFile);

    await localStorageProvider.delete(response.body, "avatar");

    expect(response.status).toBe(200);
  });
});
