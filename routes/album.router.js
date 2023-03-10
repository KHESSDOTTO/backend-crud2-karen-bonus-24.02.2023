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
        return res.status(400).json("This album already exists.");
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
    if (err.message.includes("type string")) {
      return res.status(400).json(err);
    }
    return res.status(500).json(err);
  }
});

albumRouter.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const selAlbum = await AlbumModel.findById(id);
    if (!selAlbum) {
      return res.status(404).json("Not found.");
    }
    let check = { ...selAlbum };
    if (req.body.title) {
      check = { ...check, _doc: { ...check._doc, title: req.body.title } };
    }
    if (req.body.performer) {
      check = {
        ...check,
        _doc: { ...check._doc, performer: req.body.performer },
      };
    }
    const test = await AlbumModel.find({
      title: check._doc.title,
      performer: check._doc.performer,
    });
    if (test.length !== 0 && String(test[0]._id) !== String(id)) {
      return res
        .status(400)
        .json(
          "This update will make this album have the same data that one that already exists."
        );
    }
    const updatedAlbum = await AlbumModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    return res.status(202).json(updatedAlbum);
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

albumRouter.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const selAlbum = await AlbumModel.findById(id);
    if (!selAlbum) {
      return res.status(404).json("Not found.");
    }
    const deletedAlbum = await AlbumModel.findByIdAndDelete(id);
    return res.status(200).json(deletedAlbum);
  } catch (err) {
    if (err.message.includes("type string")) {
      return res.status(400).json(err);
    }
    return res.status(500).json(err);
  }
});

export default albumRouter;
