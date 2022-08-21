import request from "supertest";

import { app } from "@shared/infra/http/app";
import { authenticateTestConnection } from "@utils/test_utilities/authenticateTestConnection";
import { closeConnection } from "@utils/test_utilities/connectionTest";

const avatar_test_image = "./assets/avatar_test_image.png";

let authorizationEmployeeToken: string;

describe("Update employee avatar", () => {
  beforeAll(async () => {
    authorizationEmployeeToken = await authenticateTestConnection();
  });

  afterAll(async () => {
    await closeConnection();
  });

  it("Should be able to update an avatar image to employee account", async () => {
    const response = await request(app)
      .patch("/accounts/employees/avatar")
      .set({ Authorization: `Bearer ${authorizationEmployeeToken}` })
      .attach("avatar", avatar_test_image);

    expect(response.status).toBe(204);
  });

  it("Should be able to update an avatar image to employee account and delete old avatar image.", async () => {
    await request(app)
      .patch("/accounts/employees/avatar")
      .set({ Authorization: `Bearer ${authorizationEmployeeToken}` })
      .attach("avatar", avatar_test_image);

    const response = await request(app)
      .patch("/accounts/employees/avatar")
      .set({ Authorization: `Bearer ${authorizationEmployeeToken}` })
      .attach("avatar", avatar_test_image);

    expect(response.status).toBe(204);
  });
});
