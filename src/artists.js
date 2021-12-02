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
  const singleArtist = db.artists.find((a) => a.id === req.params.id);

  if (singleArtist) {
    return res.json(singleArtist);
  }

  return res.status(404).json({
    error: "Artist not found",
  });
}

function addArtist(req, res) {
  const artist = req.body;

  if (db.artists.find((a) => a.id === artist.id)) {
    return res.status(400).json({
      error: "Artist already exists",
    });
  }

  db.artists.push(artist);

  res.status(201);
  res.json(artist);
}

function updateArtist(req, res) {
  const singleArtist = db.artists.find((a) => a.id === req.params.id);

  if (singleArtist) {
    singleArtist.name = req.body.name;

    return res.status(200).json(singleArtist);
  }

  return res.status(404).json({
    error: "Artist not found",
  });
}

function deleteArtist(req, res) {
  const singleArtist = db.artists.find((a) => a.id === req.params.id);

  if (!singleArtist) {
    return res.status(404).json({
      error: "Artist not found",
    });
  }

  db.songs = db.songs.filter((s) => s.artistId !== req.params.id);
  db.artists = db.artists.filter((a) => a.id !== req.params.id);

  return res.status(204).end();
}

module.exports = router;
