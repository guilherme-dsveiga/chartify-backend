const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.listen(process.env.PORT || 3001);

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refresh_token;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "fca3904abf904521b90b32ea5da9aed9",
    clientSecret: "7ad92d54797f491b8f3248fce9cacad7",
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        expires_in: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "fca3904abf904521b90b32ea5da9aed9",
    clientSecret: "7ad92d54797f491b8f3248fce9cacad7",
  });

  console.log(code);

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expires_in: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});
