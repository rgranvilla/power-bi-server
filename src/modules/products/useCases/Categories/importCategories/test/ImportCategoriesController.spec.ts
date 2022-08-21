import request from "supertest";

import { app } from "@shared/infra/http/app";
import { authenticateTestConnection } from "@utils/test_utilities/authenticateTestConnection";
import { closeConnection } from "@utils/test_utilities/connectionTest";

const valid_csv_file_test = "./assets/valid_csv_file_test.csv";
const invalid_csv_file_test = "./assets/invalid_csv_file_test.csv";
const parent_invalid_csv_file_test =
  "./assets/parent_invalid_csv_file_test.csv";

let authorizationEmployeeToken: string;

describe("Import categories from csv file", () => {
  beforeAll(async () => {
    authorizationEmployeeToken = await authenticateTestConnection();
  });

  afterAll(async () => {
    await closeConnection();
  });

  it("Should be able to import a csv file of categories and save them into the app.", async () => {
    const response = await request(app)
      .post("/categories/import")
      .set({
        Authorization: `Bearer ${authorizationEmployeeToken}`,
      })
      .attach("file", valid_csv_file_test);

    expect(response.status).toBe(201);
  });

  it("Shouldn't be able to import categories if don't be an employee authenticated.", async () => {
    const response = await request(app)
      .post("/categories/import")
      .attach("file", valid_csv_file_test);

    expect(response.body.message).toBe("Token missing");
  });

  it("Shouldn't be able to import an invalid file.", async () => {
    const response = await request(app)
      .post("/categories/import")
      .set({
        Authorization: `Bearer ${authorizationEmployeeToken}`,
      })
      .attach("file", invalid_csv_file_test);

    expect(response.body.status).toBe("error");
  });

  it("Shouldn't be able to import categories with non-existent parent.", async () => {
    const response = await request(app)
      .post("/categories/import")
      .set({
        Authorization: `Bearer ${authorizationEmployeeToken}`,
      })
      .attach("file", parent_invalid_csv_file_test);

    expect(response.status).toBe(404);
  });
});
