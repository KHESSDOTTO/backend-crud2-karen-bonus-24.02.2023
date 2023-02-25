import { Schema, model } from "mongoose";

const albumSchema = new Schema({
  performer: { type: String, required: true },
  title: { type: String, required: true },
  cost: { type: Number, required: true },
});

const AlbumModel = model("Albums", albumSchema);

export default AlbumModel;
