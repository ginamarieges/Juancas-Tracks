import { type NextFunction, type Request, type Response } from "express";
import { Track } from "../../../../database/models/Track";
import { type TrackDataStructure } from "../types";
import { getTracks } from "../tracksControllers";
import errorMessages from "../../../../utils/errorMessages/errorMessages";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getTracks controller", () => {
  const req = {};
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  const mockedTracks: TrackDataStructure = {
    album: "Abbey Road",
    image:
      "https://static.fnac-static.com/multimedia/Images/ES/NR/5b/ba/12/1227355/1540-1.jpg",
    musicType: "Rock",
    singer: "The Beatles",
    repeat: true,
    notes: "Uno de los álbumes más icónicos de The Beatles.",
    user: "64de57fc213a48254c8734e6",
    songs: [
      "Come Together",
      "Something",
      "Here Comes the Sun",
      "Octopus's Garden",
    ],
  };

  describe("When it receives a response", () => {
    Track.find = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockedTracks),
      }),
    });

    test("Then it should call the status method with status code 200", async () => {
      await getTracks(req as Request, res as Response, next as NextFunction);
      const expectedStatus = 200;

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the json method with one track", async () => {
      const expectedTracks = {
        tracks: mockedTracks,
      };
      await getTracks(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalledWith(expectedTracks);
    });
  });

  describe("When it rejects and receives a next function", () => {
    test("Then it should call the next function with 'Server error'", async () => {
      const error = errorMessages.serverError;

      Track.find = jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnValue({
          exec: jest.fn().mockRejectedValue(error),
        }),
      });

      await getTracks(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
