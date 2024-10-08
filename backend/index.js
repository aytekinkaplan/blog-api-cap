"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const express = require("express");
const app = express();
const cors = require("cors");

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require("dotenv").config();
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require("./configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- */
// Middlewares:

// Enable CORS
app.use(cors());

// Accept JSON:
app.use(express.json());

// Call static uploadFile:
app.use("/upload", express.static("./upload"));

// Check Authentication:
app.use(require("./middlewares/authentication"));

// Run Logger:
app.use(require("./middlewares/logger"));

// res.getModelList():
app.use(require("./middlewares/findSearchSortPage"));

/* ------------------------------------------------------- */
// Routes:

// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to Blog Management API",
    documents: {
      swagger: "/documents/swagger",
      redoc: "/documents/redoc",
      json: "/documents/json",
    },
    user: req.user,
  });
});

// Use Routes from routes/index.js
app.use(require("./routes"));

/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, HOST, () =>
  console.log(`Server running at http://${HOST}:${PORT}`)
);

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.
