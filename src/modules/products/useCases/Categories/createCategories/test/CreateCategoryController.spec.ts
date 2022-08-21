import request from "supertest";

import { app } from "@shared/infra/http/app";
import { authenticateTestConnection } from "@utils/test_utilities/authenticateTestConnection";
import { closeConnection } from "@utils/test_utilities/connectionTest";

let token: string;

describe("Create category", () => {
  beforeAll(async () => {
    token = await authenticateTestConnection();
  });
  afterAll(async () => {
    await closeConnection();
  });

  it("Should be able to create a new category.", async () => {
    const category = {
      title: "Category title test",
      parent_title: "Root",
      category_level: 1,
      icon_url: "",
    };

    const response = await request(app)
      .post("/categories")
      .send(category)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.body.message).toBe("Category created");
  });
});
