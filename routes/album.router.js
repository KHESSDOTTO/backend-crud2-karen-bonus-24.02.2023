import express from "express";
import AlbumModel from "../models/album.model.js";

const albumRouter = express.Router();

albumRouter.post("/create", async (req, res) => {
  try {
    if (req.body.title && req.body.performer) {
      const test = await AlbumModel.find({
        title: req.body.title,
        performer: req.body.performer,
      });
      if (test.length !== 0) {
        return res.status(400).json("The album already exists.");
      }
    }
    const newAlbum = await AlbumModel.create(req.body);
    return res.status(201).json(newAlbum);
  } catch (err) {
    console.log(err);
    if (err.name.includes("ValidationError")) {
      return res.status(400).json(err);
    }
    return res.status(500).json(err);
  }
});

albumRouter.get("/get/all", async (req, res) => {
  try {
    const albums = await AlbumModel.find();
    return res.status(200).json(albums);
  } catch (err) {
    return res.status(500).json(err);
  }
});

albumRouter.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const selAlbum = await AlbumModel.findById(id);
    if (!selAlbum) {
      return res.status(404).json("Not found.");
    }
    return res.status(200).json(selAlbum);
  } catch (err) {
    console.log(err);
    if (
      err.name.includes("ValidationError") ||
      err.message.includes("type string")
    ) {
      return res.status(400).json(err);
    }
    return res.status(500).json(err);
  }
});

albumRouter.put("edit/:id", async (req, res) => {
  try {
    return res.status(202).json("Ok");
  } catch (err) {
    if (
      err.name.includes("ValidationError") ||
      err.message.includes("type string")
    ) {
      return res.status(400).json(err);
    }
    return res.status(500).json(err);
  }
});

albumRouter.delete("delete/:id", async (req, res) => {});

export default albumRouter;
