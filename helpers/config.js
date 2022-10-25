import dotenv from "dotenv";
dotenv.config();

const vars = {
  MONGO_DB_USERNAME: process.env.MONGO_DB_USERNAME,
  MONGO_DB_PASSWORD: process.env.MONGO_DB_PASSWORD,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  PORT: process.env.PORT,
};

const config = {
  ...vars,
  mongoDbUrl: `mongodb+srv://${vars.MONGO_DB_USERNAME}:${vars.MONGO_DB_PASSWORD}@cluster0.kvnorau.mongodb.net/kanban?retryWrites=true&w=majority`,
};

export default config;
