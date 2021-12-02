const express = require("express");
const router = express.Router();
const db = require("./db");

router.get("/api/artists", artists);
router.post("/api/artists", addArtist);
router.put("/api/artists/:id", updateArtist);
router.get("/api/artists/:id", artist);
router.delete("/api/artists/:id", deleteArtist);

function artists(req, res) {
  res.json(db.artists);
}

function artist(req, res) {
  res.json({
    error: "Artist not found",
  });
}

function addArtist(req, res) {
  const artist = req.body;

  db.artists.push(artist);

  res.status(201);
  res.json(artist);
}

function updateArtist(req, res) {
  res.json({
    error: "Artist not found",
  });
}

function deleteArtist(req, res) {
  res.status(201).end();
}

module.exports = router;
