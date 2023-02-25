import express from "express";
import * as dotenv from "dotenv";
import connect from "./config/db.config.js";
import albumRouter from "./routes/album.router.js";
import purchaseRouter from "./routes/purchase.router.js";

const app = express();
dotenv.config();
connect();

app.use(express.json());

app.use("/albums", albumRouter);
app.use("/purchases", purchaseRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server up and running on port: ${process.env.PORT}!`);
});
