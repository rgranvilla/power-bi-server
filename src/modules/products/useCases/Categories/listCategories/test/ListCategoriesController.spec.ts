import request from "supertest";

import { app } from "@shared/infra/http/app";
import { closeConnection } from "@utils/test_utilities/connectionTest";
import { createCategoriesTestConnection } from "@utils/test_utilities/createCategoriesTestConnection";

describe("List all categories", () => {
  beforeAll(async () => {
    // create list of categories content 9 insertions
    await createCategoriesTestConnection();
  });

  afterAll(async () => {
    await closeConnection();
  });

  it("Should be able list all categories", async () => {
    const response = await request(app).get("/categories/");

    expect(response.body.length).toBe(9);
  });
});
