import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3004;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    
    res.render("index.ejs", { error: "result" });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const country = req.body.country;
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${country}?fullText=true`
    );
    const result = response.data[0]['name']['official'];
    console.log(result);
    res.render("index.ejs", {
      data: result,
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
