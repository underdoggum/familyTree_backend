require("dotenv").config();
const { PORT = 3003, DATABASE_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");


//////////////////////////
// Database Connection
//////////////////////////
mongoose.connect(DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.connection
  .on("open", () => console.log("Connected to Mongo"))
  .on("close", () => console.log("Disconnected from Mongo"))
  .on("error", error => console.error(error));


//////////////////////////
// Models
//////////////////////////
const PeopleSchema = new mongoose.Schema({
  name: String,
  isMan: Boolean
});

const People = mongoose.model("People", PeopleSchema);


///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


//////////////////////////
// Routes
//////////////////////////
// test
app.get("/", (req, res) => {
  res.send("Hello world");
});

// index route
app.get("/people", async (req, res) => {
  try {
    res.json(await People.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});

// create route
app.post("/people", async (req, res) => {
  try {
    res.json(await People.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

// update route
app.put("/people/:id", async (req, res) => {
  try {
    res.json(
      await People.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    res.status(400).json(error);
  }
});

// destroy
app.delete("/people/:id", async (req, res) => {
  try {
    res.json(await People.findByIdAndRemove(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});






//////////////////////////
// Listener
//////////////////////////
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
