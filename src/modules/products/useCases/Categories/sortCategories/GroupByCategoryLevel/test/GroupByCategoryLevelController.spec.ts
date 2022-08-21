import request from "supertest";

import { app } from "@shared/infra/http/app";
import { closeConnection } from "@utils/test_utilities/connectionTest";
import { createCategoriesTestConnection } from "@utils/test_utilities/createCategoriesTestConnection";

describe("Group by category level", () => {
  beforeAll(async () => {
    await createCategoriesTestConnection();
  });

  afterAll(async () => {
    await closeConnection();
  });

  it("Should be able order categories by category level", async () => {
    const response = await request(app).get(
      "/categories/group/by_category_level"
    );

    expect(response.status).toBe(200);
  });
});
