const express = require('express');
const pool = require('../utils/pool');

const song = express.Router();

song.get('/song', (req, res, next) => {
  let query = req.query;
  pool.query('select * from song where singer_id=?', [query.id], (err, result) => {
    if (err) {
      next();
      return;
    }
    let songs = [];
    result.forEach(element => {
      songs.push({
        id: element.id,
        name: element.name,
        author: element.author,
        dt: element.dt,
        imgUrl: element.imgUrl,
        lyric: element.lyric,
        url: element.url
      });
    });
    res.send({
      songs: songs,
      code: 200,
      msg: 'success'
    });
  });
})

song.get('/songDetail', (req, res, next) => {
  let query = req.query;
  pool.query('select * from song where id=?', [query.id], (err, result) => {
    if (err) {
      next();
      return;
    }
    let song = {
      id: result[0].id,
      name: result[0].name,
      author: result[0].author,
      dt: result[0].dt,
      imgUrl: result[0].imgUrl,
      lyric: result[0].lyric,
      url: result[0].url
    };
    res.send({
      song: song,
      code: 200,
      msg: 'success'
    });
  });
})

module.exports = song;