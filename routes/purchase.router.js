import express from "express";
import AlbumModel from "../models/album.model.js";

const purchaseRouter = express.Router();

purchaseRouter.post("/create", (req, res) => {});
purchaseRouter.get("/get/all", (req, res) => {});
purchaseRouter.get("/get/:id", (req, res) => {});
purchaseRouter.put("edit/:id", (req, res) => {});
purchaseRouter.delete("delete/:id", (req, res) => {});

export default purchaseRouter;
