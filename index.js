import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3056
;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "plscallmeloo";
const yourPassword = "ILoveProgramming";
const yourAPIKey = "ee02737d-0498-467d-9884-44d1480028d1";
const yourBearerToken = "db47c3c6-d5bd-4fa8-a142-c0f301a37db8";


app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", (req, res) => {
  
  axios.get(API_URL + "random")
  .then(response => {
    res.render("index.ejs", { content: JSON.stringify(response.data)});
    console.log('Response data:', response.data);
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error:', error.message);
  });
});

const credentials = Buffer.from(`${yourUsername}:${yourPassword}`).toString('base64');

const config = {
  headers: {
    Authorization: `Basic ${credentials}`,
  },
};


app.get("/basicAuth", (req, res) => {
  axios.get(API_URL + "all?page=1", config)
  .then(response => {
    res.render("index.ejs", { content: JSON.stringify(response.data)});
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
});


app.get("/apiKey", async (req, res) => {
  axios.get("https://secrets-api.appbrewery.com/filter?score=5&apiKey=ee02737d-0498-467d-9884-44d1480028d1", config)
  .then(response => {
    res.render("index.ejs", { content: JSON.stringify(response.data)});
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
});



app.get("/bearerToken", (req, res) => {

  
  axios.get("https://secrets-api.appbrewery.com/secrets/1", {
    headers: {
      "Authorization": `Bearer ${yourBearerToken}`
    }
  })
    .then((response) => {
      // Aqui, response contém a resposta da API
      res.render("index.ejs", { content: JSON.stringify(response.data) });
    })
    .catch((error) => {
      console.log(error);
      // Trate o erro aqui se necessário
    });
  })
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
