const express = require("express");
const { Sequelize } = require("sequelize");

const dotenv = require("dotenv");
dotenv.config();

const logger = require("morgan");
const cors = require("cors");

const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

const sequelizeOptions = {
  host: DB_HOST,
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

const sequelize = new Sequelize(
  DB_NAME || "",
  DB_USERNAME || "",
  DB_PASSWORD || "",
  sequelizeOptions
);

const PORT = process.env.PORT || 8080;

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`server starting on ${PORT}`));

const versionRouter = require("./routes/api/version");
const dogsRouter = require("./routes/api/dogs");

app.use("/ping", versionRouter);
app.use("/dogs", dogsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;
