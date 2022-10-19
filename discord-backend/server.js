const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require('./routes/authRoutes.js')

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes)

mongoose
  .connect(process.env.DB_LOCAL_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(`MongoDB database connected with HOST: ${con.connection.host}`);
  })
  .catch((err) => {
    console.log(`Database connection failed. Server not started`);
    console.error(err);
  })

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
