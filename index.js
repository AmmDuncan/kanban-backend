import http from "http";
import mongoose from "mongoose";

import { app } from "./app";

import config from "./helpers/config";

const server = http.createServer(app);

mongoose
  .connect(config.mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to db");
  });

const port = config.PORT || 8080;
server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
