require("dotenv").config();
const { PORT = 3333, DATABASE_URL } = process.env;
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
const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  headline: String,
  picture: String
},{ timestamps: true });

const Blog = mongoose.model("Blog", BlogSchema);


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
app.get("/blogs", async (req, res) => {
  try {
    res.json(await Blog.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});

// create route
app.post("/blogs", async (req, res) => {
  try {
    res.json(await Blog.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

// update route
app.put("/blogs/:id", async (req, res) => {
  try {
    res.json(
      await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    res.status(400).json(error);
  }
});

// destroy
app.delete("/blogs/:id", async (req, res) => {
  try {
    res.json(await Blog.findByIdAndRemove(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

// show
app.get("/blogs/:id", async (req, res) => {
  try {
    res.json(await Blog.findById(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
})






//////////////////////////
// Listener
//////////////////////////
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
