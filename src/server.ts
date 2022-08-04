import express from "express";

import { router } from "./routes";

const app = express();
app.use(express.json());

app.use(router);

app.listen(3100, () => console.log("Server is running on port 3100"));
