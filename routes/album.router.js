import express from "express";
import AlbumModel from "../models/album.model.js";

const albumRouter = express.Router();

albumRouter.post("/create", async (req, res) => {});
albumRouter.get("/get/all", (req, res) => {});
albumRouter.get("/get/:id", (req, res) => {});
albumRouter.put("edit/:id", (req, res) => {});
albumRouter.delete("delete/:id", (req, res) => {});

export default albumRouter;
