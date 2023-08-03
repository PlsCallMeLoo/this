import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { Console } from "console";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3003;

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended : true}))
/* Write your code here:
Step 1: Render the home page "/" index.ejs
Step 2: Make sure that static files are linked to and the CSS shows up.
Step 3: Add the routes to handle the render of the about and contact pages.
  Hint: Check the nav bar in the header.ejs to see the button hrefs
Step 4: Add the partials to the about and contact pages to show the header and footer on those pages. */
app.get("/", (req, res) => {

  res.render("index.ejs", {})
});

app.get("/about", (req, res) => {

  res.render("about.ejs", {})
});


app.get("/contact", (req, res) => {

  res.render("contact.ejs", {})
});2

app.post("/email", (req, res) => {
  console.log(req.body)
  res.render("contact.ejs", {})


});


app.listen(3030, () => {
    console.log(`Server runing on port ${port}`);
});
