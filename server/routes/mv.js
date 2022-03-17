const express = require('express');
const pool = require('../utils/pool');

const mv = express.Router();
mv.get('/mv', (req, res, next) => {
  let query = req.query;
  let sql = '';
  if (query.area == '全部')
    sql = 'select * from mv';
  else
    sql = "select * from mv where area='" + query.area + "'";
  console.log(sql);
  pool.query(sql, (err, result) => {
    if (err) {
      next();
      return;
    }
    let mvs = [];
    result.forEach(element => {
      mvs.push({
        id: element.id,
        name: element.name,
        author: element.author,
        playCount: element.playCount,
        create_data: element.create_data,
        area: element.area,
        desc: element.desc,
        imgUrl: element.imgUrl,
        url: element.url
      });
    });
    res.send({
      mvs: mvs,
      code: 200,
      msg: 'success'
    });
  });
});

mv.get('/mvDetail', (req, res, next) => {
  let query = req.query;
  pool.query('select * from mv where id=?', [query.id], (err, result) => {
    if (err) {
      next();
      return;
    }
    let mv = {
      id: result[0].id,
      name: result[0].name,
      author: result[0].author,
      playCount: result[0].playCount,
      create_data: result[0].create_data,
      area: result[0].area,
      desc: result[0].desc,
      imgUrl: result[0].imgUrl,
      url: result[0].url
    };
    res.send({
      mv: mv,
      code: 200,
      msg: 'success'
    });
  });
});
module.exports = mv;