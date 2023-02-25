import express from "express";
import PurchaseModel from "../models/purchase.model.js";
import AlbumModel from "../models/album.model.js";

const purchaseRouter = express.Router();

purchaseRouter.post("/create", async (req, res) => {
  try {
    if (req.body.album) {
      const checkAlbumId = await AlbumModel.findById(req.body.album);
      if (!checkAlbumId) {
        return res.status(404).json("Album not found.");
      }
    }
    const newPurchase = await (
      await PurchaseModel.create(req.body)
    ).populate("album");
    return res.status(201).json(newPurchase);
  } catch (err) {
    console.log(err);
    if (err.name.includes("ValidationError")) {
      return res.status(400).json(err);
    }
    return res.status(500).json(err);
  }
});

purchaseRouter.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const selPurchase = await PurchaseModel.findById(id).populate("album");
    if (!selPurchase) {
      return res.status(404).json("Purchase not found");
    }
    return res.status(200).json(selPurchase);
  } catch (err) {
    console.log(err);
    if (err.message.includes("type string")) {
      res.status(400).json(err);
    }
  }
});

export default purchaseRouter;
