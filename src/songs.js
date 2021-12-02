const express = require("express");
const router = express.Router();
const db = require("./db");

router.get("/api/artists/:artistId/songs", songs);
router.post("/api/artists/:artistId/songs", addSong);
router.delete("/api/artists/:artistId/songs/:songId", deleteSong);

function songs(req, res) {
  const artistId = req.params.artistId;
  const artist = db.artists.find((a) => a.id === artistId);

  if (!artist) {
    return res.status(404).json({
      error: "Artist not found",
    });
  }

  res.json(db.songs.filter((s) => s.artistId === artistId));
}

function addSong(req, res) {
  const artistId = req.params.artistId;

  if (!req.body.name) {
    return res.status(400).json({
      error: "Invalid body provided, missing property: name",
    });
  }

  const song = {
    artistId,
    id: `${db.songs.length + 1}`,
    name: req.body.name,
  };

  if (db.artists.find((a) => a.id !== artistId)) {
    return res.status(404).json({
      error: "Artist not found",
    });
  }

  if (db.songs.find((s) => s.name === song.name)) {
    return res.status(400).json({
      error: "Song already exists",
    });
  }

  db.songs.push(song);

  res.status(201);
  res.json(song);
}

function deleteSong(req, res) {
  const artist = db.artists.find((a) => a.id === req.params.artistId);

  if (!artist) {
    return res.status(404).json({
      error: "Artist not found",
    });
  }

  const song = db.songs.find((s) => s.id === req.params.songId);

  if (!song) {
    return res.status(404).json({
      error: "Song not found",
    });
  }

  if (song.artistId !== artist.id) {
    return res.status(400).json({
      error: "Song does not belong to provided artist",
    });
  }

  db.songs = db.songs.filter((s) => s.id === req.params.songId);

  res.status(204).end();
}

module.exports = router;
