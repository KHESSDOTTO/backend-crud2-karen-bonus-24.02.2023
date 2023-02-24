import express from "express";

const albumRouter = express.Router();

albumRouter.post("/create", (req, res) => {});
albumRouter.get("/get/all", (req, res) => {});
albumRouter.get("/get/:id", (req, res) => {});
albumRouter.put("edit/:id", (req, res) => {});
albumRouter.delete("delete/:id", (req, res) => {});

export default albumRouter;
