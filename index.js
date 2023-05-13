const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");

const { Achievement } = require("./models");

app.use(bodyParser.urlencoded({ extended: true }));

const path = require("path");
// app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1])
  }
})

const upload = multer({ storage: storage })

app.set("view engine", "ejs");
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "public")));

// home
app.get("/", async (req, res) => {
  const allAchievements = await Achievement.getAchievements();
  if (req.accepts("html")) {
    res.render("index", {
      allAchievements,
    });
  } else {  
    res.json({
      allAchievements
    });
  }
});

// Add
app.get("/add", async (req, res) => {
  if (req.accepts("html")) {
    res.render("Add");
  } else {  
    res.json();
  }
});

// eslint-disable-next-line no-unused-vars
app.post("/achievement",upload.single('file'), async (req, res) => {
  console.log("adding a achievement", req.body);
  try {
    const { originalname, path } = req.file;
    const { contestOrCourseName, date } = req.body;

    await Achievement.createAchievement(contestOrCourseName,originalname,path,date)

    res.redirect("/");
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while uploading the file.' });
  }
});

// eslint-disable-next-line no-unused-vars
// app.put("/achievement/:id", async (req, res) => {
//   console.log("updating a achievement with ID : ", req.params.id);
// });

// eslint-disable-next-line no-unused-vars
// delete a achievement and certificate associated with it.
app.delete("/achievement/:id", async (req, res) => {
  console.log("Delete a todo with ID : ", req.params.id);
  try {
    const entry = await Achievement.getAchievement(req.params.id);
    await Achievement.removeAchievement(req.params.id);
    fs.unlink("public/"+ entry.filePath, (err) => {
      if (err) {
        console.error('Error deleting image file', err);
      }
    });
    res.json({success: true});
  } catch (e) {
    console.log(e);
    return res.status(422).json(e);
  }
  
});

app.listen(3000, () => {
  console.log("started express server at port 3000");
});
