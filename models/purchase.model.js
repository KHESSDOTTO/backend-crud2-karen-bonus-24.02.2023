import { Schema, model } from "mongoose";

const purchaseSchema = new Schema({
  shippingAddress: { type: String, required: true },
  album: { type: Schema.Types.ObjectId, required: true },
});

const PurchaseModel = model("Purchase", purchaseSchema);

export default PurchaseModel;
