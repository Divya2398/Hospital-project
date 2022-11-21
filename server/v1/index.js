import express from "express";
const app = express();
import db from "./db/db.js";

import api from "./api/index.js";

app.use("/api", api);

export default app;
