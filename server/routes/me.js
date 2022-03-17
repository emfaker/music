const express = require('express');
const pool = require('../utils/pool');

const me = express.Router();

// 获取用户收藏歌曲
me.get('/me/song', (req, res, next) => {
  let query = req.query;
  pool.query('select * from song where id in (select song_id from collection_song where user_id=?)', [query.id], (err, result) => {
    if (err) {
      next();
      return;
    }
    let songs = [];
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
});

// 添加喜爱歌曲
me.get('/me/addSong', (req, res, next) => {
  let query = req.query;
  pool.query('select * from collection_song where user_id=? and song_id=?', [query.userId,query.songId], (err, result) => {
    if (err) {
      next();
      return;
    }
    console.log(result);
    if (result[0]) {
      return
    } else {
      pool.query('insert ignore into collection_song (user_id,song_id) values (?,?)', [query.userId,query.songId], (err, result) => {
        if (err) {
          next();
          return;
        }
        console.log(result);
        res.send({
          code: 200,
          msg: 'success'
        });
      });
    }
  });
});

// 移除喜爱歌曲
me.get('/me/deleteSong', (req, res, next) => {
  let query = req.query;
  console.log(query.userId,query.songId);
  pool.query('delete from collection_song where user_id=? and song_id=?', [query.userId,query.songId], (err, result) => {
    if (err) {
      next();
      return;
    }
    console.log(result);
    res.send({
      code: 200,
      msg: 'success'
    });
  });
});

// 添加收藏歌曲
me.get('/me/addSongList', (req, res, next) => {
  let query = req.query;
  console.log(query);
  pool.query('select * from collection_songlist where user_id=? and songlist_id=?',[query.userId,query.songListId], (err, result) => {
    if (err) {
      next();
      return;
    }
    console.log(result);
    if (result[0]) {
      return
    } else {
      console.log('嘤嘤嘤');
      pool.query('insert into collection_songlist (user_id,songlist_id) values (?,?)',[query.userId,query.songListId], (err, result) => {
        if (err) {
          next();
          return;
        }
        console.log(result);
        res.send({
          code: 200,
          msg: 'success'
        });
      });
    }
  });
});

// 获取用户收藏歌单
me.get('/me/songList', (req, res, next) => {
  let query = req.query;
  pool.query('select * from songs where id in (select songlist_id from collection_songlist where user_id=?)', [query.id], (err, result) => {
    if (err) {
      next();
      return;
    }
    let songList = [];
    result.forEach(element => {
      songList.push({
        id: element.id,
        title: element.title,
        imgUrl: element.imgUrl
      });
    });
    res.send({
      songList: songList,
      code: 200,
      msg: 'success'
    });
  });
});

// 移除收藏歌曲
me.get('/me/deleteSongList', (req, res, next) => {
  let query = req.query;
  console.log(query.userId,query.songListId);
  pool.query('delete from collection_songlist where user_id=? and songlist_id=?', [query.userId,query.songListId], (err, result) => {
    if (err) {
      next();
      return;
    }
    res.send({
      code: 200,
      msg: 'success'
    });
  });
});

// 获取用户详情
me.get('/me/detail', (req, res, next) => {
  let query = req.query;
  pool.query('select * from user where id=?', [query.id], (err, result) => {
    if (err) {
      next();
      return;
    }
    let user = {
      id: result[0].id,
      account: result[0].account,
      imgUrl: result[0].imgUrl,
    };
    res.send({
      user: user,
      code: 200,
      msg: 'success'
    });
  });
});

//用户登录
me.post('/login', (req, res, next) => {
  let query = req.body;
  pool.query('select * from user where account=? and password=?', [query.account, query.password], (err, result) => {
    if (err) {
      next();
      return;
    }
    if (result.length != 0) {
      res.send({
        user: {
          id: result[0].id,
          imgUrl: result[0].imgUrl
        },
        code: 200,
        msg: 'success'
      });
    } else {
      res.send({
        code: 201,
        msg: 'fail'
      });
    }
  });
});

//用户注册
me.post('/register', (req, res, next) => {
  let query = req.body;
  pool.query('insert into user (account,password,phone) values (?,?,?)', [query.account, query.password, query.phone], (err, result) => {
    if (err) {
      next();
      return;
    }
    console.log(result);
    if (result.affectedRows == 1) {
      res.send({
        code: 200,
        msg: 'success'
      });
    } else {
      res.send({
        code: 201,
        msg: 'fail'
      });
    }
  });
});

module.exports = me;