const express = require('express');
const pool = require('../utils/pool');

const search = express.Router();
// 轮播图
search.get('/search', (req, res, next) => {
  let query = req.query;
  console.log(query);
  pool.query("select * from song where name like ? or author like ? limit ?,?", ['%' + query.keyword + '%', '%' + query.keyword + '%', parseInt(query.offset), parseInt(query.limit)], (err, result) => {
    if (err) {
      next();
      return;
    }
    let songs = [];
    console.log(result);
    result.forEach(element => {
      songs.push({
        id: element.id,
        name: element.name,
        author: { id: element.singer_id, author: element.author },
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

module.exports = search;