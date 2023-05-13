const express = require("express");
const app = express();

const path = require("path");

app.set("view engine", "ejs");
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "public")));

// home
app.get("/", async (req, res) => {
  if (req.accepts("html")) {
    res.render("index", {});
  } else {
    res.json({});
  }
});

// eslint-disable-next-line no-unused-vars
app.post("/achievement", async (req, res) => {
  console.log("adding a achievement", req.body);
});

// eslint-disable-next-line no-unused-vars
app.put("/achievement/:id", async (req, res) => {
  console.log("updating a achievement with ID : ", req.params.id);
});

// eslint-disable-next-line no-unused-vars
app.delete("/achievement/:id", async (req, res) => {
  console.log("Delete a todo with ID : ", req.params.id);
});

app.listen(3000, () => {
  console.log("started express server at port 3000");
});
