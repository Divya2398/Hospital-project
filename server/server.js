import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import v1 from "./v1/index.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/v1", v1);
app.use("/v1/uploads", express.static('./v1/uploads'));

let port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
