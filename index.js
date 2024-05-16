const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

// configure dotenv
dotenv.config();
// cors for cross-origin requests to the frontend application
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());

const db = require("./db");

db.connect();

const router = require("./router/index");
app.use(router);

// Server Setup
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server is running at PORT: ${PORT}`);
});
