import { Schema, model } from "mongoose";
import AlbumModel from "./album.model.js";

const purchaseSchema = new Schema({
  shippingAddress: { type: String, required: true },
  album: { type: Schema.Types.ObjectId, required: true, ref: "Albums" },
});

const PurchaseModel = model("Purchase", purchaseSchema);

export default PurchaseModel;
