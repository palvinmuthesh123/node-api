const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 8081;
var firebase = require('firebase')

const firebaseConfig = {
  apiKey: "AIzaSyB7KhCofETRPhOnk78_xeu1_-wNhzcyVSQ",
  authDomain: "my-api-latest.firebaseapp.com",
  databaseURL: "https://my-api-latest-default-rtdb.firebaseio.com",
  projectId: "my-api-latest",
  storageBucket: "my-api-latest.appspot.com",
  messagingSenderId: "325027532163",
  appId: "1:325027532163:web:ae8f4a71b9dd55dd18bab6",
  measurementId: "G-D43FT9Y0GD"
};

firebase.initializeApp(firebaseConfig)

// Get a reference to the database service
let database = firebase.database()
let quizRef = database.ref("quiz")

app.get('/', async (req, res) => {
  const username = req.query.username || 'palvinmuthesh123';
  try {
    const result = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    const repos = result.data
      .map((repo) => ({
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
        stars: repo.stargazers_count
      }))
      .sort((a, b) => b.stars - a.stars);

    res.send(repos);
  } catch (error) {
    res.status(400).send('Error while getting list of repositories');
  }
});


app.get('/hello', function (req, res) {
  console.log("Got a GET request for the homepage");
  res.send('Hello GET');
})

app.get('/try', function(req, res) {
  database.ref("customPath").set(obj, function(error) {
    if (error) {
      // The write failed...
      console.log("Failed with error: " + error)
    } else {
      // The write was successful...
      console.log("success")
    }
})
})


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
