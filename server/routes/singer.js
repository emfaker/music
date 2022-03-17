const { query } = require('express');
const express = require('express');
const pool = require('../utils/pool');

const singer = express.Router();
singer.get('/singer', (req, res, next) => {
  let query = req.query;
  console.log(query, '嘤嘤嘤');
  // let sql = (query.gender == '-1' && query.area == "全部" && query.fn == '-1' ? "select * from singer" : "select * from singer where gender='" + query.gender + "'" + "and area='" + query.area + "'" + "and fn='" + query.fn + "'");
  let sql = "";
  if (query.gender == '-1' && query.area == "全部" && query.fn == '-1') {
    sql = "select * from singer";
  } else if (query.gender == '-1' && query.area == "全部" && query.fn != '-1') {
    sql = "select * from singer where fn='" + query.fn + "'";
  } else if (query.gender == '-1' && query.area != "全部" && query.fn == '-1') {
    sql = "select * from singer where area='" + query.area + "'";
  } else if (query.gender != '-1' && query.area == "全部" && query.fn == '-1') {
    sql = "select * from singer where gender='" + query.gender + "'";
  } else if (query.gender == '-1' && query.area != "全部" && query.fn != '-1') {
    sql = "select * from singer where area='" + query.area + "'" + "and fn='" + query.fn + "'";
  } else if (query.gender != '-1' && query.area == "全部" && query.fn != '-1') {
    sql = "select * from singer where gender='" + query.gender + "'" + "and fn='" + query.fn + "'";
  } else if (query.gender != '-1' && query.area != "全部" && query.fn == '-1') {
    sql = "select * from singer where gender='" + query.gender + "'" + "and area='" + query.area + "'";
  } else if (query.gender != '-1' && query.area != "全部" && query.fn != '-1') {
    sql = "select * from singer where gender='" + query.gender + "'" + "and area='" + query.area + "'" + "and fn='" + query.fn + "'";
  }
  pool.query(sql, (err, result) => {
    if (err) {
      next();
      return;
    }
    let singers = [];
    result.forEach(result => {
      singers.push({
        id: result.id,
        name: result.name,
        gender: result.gender,
        nationality: result.nationality,
        birth: result.birth,
        area: result.area,
        fn: result.fn,
        briefDesc: result.briefDesc,
        albumSize: result.albumSize,
        musicSize: result.musicSize,
        mvSize: result.mvSize,
        imgUrl: result.imgUrl,
      });
    });
    res.send({
      singers: singers,
      code: 200,
      msg: 'success'
    });
  });
});

singer.get('/singer_detail', (req, res, next) => {
  let query = req.query;
  pool.query('select * from singer where id=?', [query.id], (err, result) => {
    if (err) {
      next();
      return;
    }
    let author = {
      id: result[0].id,
      name: result[0].name,
      gender: result[0].gender,
      nationality: result[0].nationality,
      birth: result[0].birth,
      briefDesc: result[0].briefDesc,
      albumSize: result[0].albumSize,
      musicSize: result[0].musicSize,
      mvSize: result[0].mvSize,
      imgUrl: result[0].imgUrl
    };
    res.send({
      singer: author,
      code: 200,
      msg: 'success'
    });
  });
})

module.exports = singer;