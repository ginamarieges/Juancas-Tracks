import { Schema, Types, model } from "mongoose";
import { User } from "./User";

const trackSchema = new Schema({
  album: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  musicType: {
    type: String,
    required: true,
  },
  singer: {
    type: String,
    required: true,
  },
  repeat: {
    type: Boolean,
  },
  notes: {
    type: String,
  },
  user: {
    type: Types.ObjectId,
    ref: User,
  },
  songs: [String],
});

export const Track = model("Track", trackSchema, "tracks");
