import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { errorHandler } from "./middlewares/error_handler";
import { notFound } from "./middlewares/not_found";

import path from "path";
import { apiRouter } from "./routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("combined"));

app.use("/api", apiRouter);

app.get("/", async (_, res) => {
  const welcomeFilePath = path.join(__dirname, "welcome.html");
  return res.sendFile(welcomeFilePath);
});

app.use(notFound);
app.use(errorHandler);

export { app };
