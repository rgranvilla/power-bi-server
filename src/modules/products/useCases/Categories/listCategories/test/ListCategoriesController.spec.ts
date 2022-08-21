import {
  authenticateConnection,
  closeConnection,
} from "@utils/test/authenticateConnection";

let authorizationEmployeeToken: string;

describe("List all categories", () => {
  beforeAll(async () => {
    authorizationEmployeeToken = await authenticateConnection();
  });

  afterAll(async () => {
    await closeConnection();
  });
});
