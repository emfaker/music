const express = require('express');
const pool = require('../utils/pool');

const home = express.Router();
// 轮播图
home.get('/banner', (req, res, next) => {
  let sql = 'select * from banner';
  pool.query(sql, (err, result) => {
    if (err) {
      next();
      return;
    }
    let banners = [];
    result.forEach(element => {
      banners.push({
        banner_id: element.banner_id,
        imageUrl: element.imageUrl,
        typeTitle: element.typeTitle
      });
    });
    res.send({
      banners: banners,
      code: 200,
      msg: 'success'
    });
  });
})

// 推荐歌单
home.get('/home/songlist', (req, res, next) => {
  let sql = 'select * from songs_home';
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

// 推荐歌曲
home.get('/home/songs', (req, res, next) => {
  let sql = 'select * from song_home';
  pool.query(sql, (err, result) => {
    if (err) {
      next();
      return;
    }
    let songs = [];
    result.forEach(element => {
      songs.push({
        id: element.id,
        name: element.name,
        song_id: element.song_id,
        author: {
          id: element.singer_id,
          author: element.author
        },
        dt: element.dt,
        imgUrl: element.imgUrl
      });
    });
    res.send({
      songs: songs,
      code: 200,
      msg: 'success'
    });
  });
})

// 推荐歌手
home.get('/home/singer', (req, res, next) => {
  let sql = 'select * from singer_home';
  pool.query(sql, (err, result) => {
    if (err) {
      next();
      return;
    }
    let singers = [];
    result.forEach(element => {
      singers.push({
        id: element.id,
        name: element.name,
        imgUrl: element.imgUrl
      });
    });
    res.send({
      singers: singers,
      code: 200,
      msg: 'success'
    });
  });
})

module.exports = home;