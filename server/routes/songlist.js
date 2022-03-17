const express = require('express');
const pool = require('../utils/pool');

const songlist = express.Router();

// 获取歌单分类
songlist.get('/catlist', (req, res, next) => {
  let sql = 'select * from catlist';
  pool.query(sql, (err, result) => {
    if (err) {
      next();
      return;
    }
    let catlist = [];
    result.forEach(element => {
      catlist.push({
        id: element.id,
        name: element.name,
        category: element.category,
        resourceCount: element.resourceCount
      });
    });
    res.send({
      catlist: catlist,
      code: 200,
      msg: 'success'
    });
  });
})

// 推荐歌单
songlist.get('/songlist', (req, res, next) => {
  let query = req.query;
  console.log(query.type);
  let sql = (query.type == "全部" ? "select * from songs" : "select * from songs where type='" + query.type + "'");
  pool.query(sql, (err, result) => {
    if (err) {
      next();
      return;
    }
    let songlist = [];
    result.forEach(element => {
      songlist.push({
        id: element.id,
        title: element.title,
        playCount: element.playCount,
        imgUrl: element.imgUrl
      });
    });
    res.send({
      songlist: songlist,
      code: 200,
      msg: 'success'
    });
  });
})

// 单个歌单
songlist.get('/songlistdetails', (req, res, next) => {
  let query = req.query;
  console.log(query.type);
  pool.query('select * from songs where id=?', [query.id], (err, result) => {
    if (err) {
      next();
      return;
    }
    console.log(result);
    let songlist = {
      id: result[0].id,
      title: result[0].title,
      playCount: result[0].playCount,
      imgUrl: result[0].imgUrl,
      desc: result[0].desc
    };
    res.send({
      songlist: songlist,
      code: 200,
      msg: 'success'
    });
  });
})

// 歌单歌曲
songlist.get('/songlist/song', (req, res, next) => {
  let query = req.query;
  console.log(query);
  pool.query('select * from song where id in (select song_id from songlist where songs_id = ?)', [query.id], (err, result) => {
    if (err) {
      next();
      return;
    }
    let songs = [];
    result.forEach(element => {
      songs.push({
        id: element.id,
        name: element.name,
        author: {
          id: element.singer_id,
          author: element.author
        },
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

module.exports = songlist;