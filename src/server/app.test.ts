import request from "supertest";
import { app } from "./app.js";

describe("Given a GET '/ping' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a response with status code 200 and the message 'Pong' ", async () => {
      const expectedStatus = 200;
      const expectedMessage = "Pong";

      const response = await request(app).get("/ping").expect(expectedStatus);

      expect(response.body).toStrictEqual({ message: expectedMessage });
    });
  });
});
