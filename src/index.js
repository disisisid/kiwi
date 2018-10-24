import "./env";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

import { apiRouter } from "./routes";

const app = express();

const { PORT = 3005 } = process.env;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.disable("x-powered-by");

app.use("/kiwi", apiRouter);

app.listen(PORT, console.log("> Kiwi listening"));
