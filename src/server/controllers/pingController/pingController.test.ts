import { type Request, type Response } from "express";
import { pingController } from "./pingController";

describe("Given a pingController controller", () => {
  const req = {};
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it receives a request", () => {
    test("Then it should call the response method status with the status code 200", () => {
      const expcetedStatus = 200;

      pingController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expcetedStatus);
    });

    test("Then it should call the response method json with 'Pong'", () => {
      const expectedMessage = /pong/i;

      pingController(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
});
