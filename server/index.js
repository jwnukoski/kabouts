const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./database.js');
const conn = require('./connection.js');
const path = require('path');

app.use(cors());

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/api/location/:loc_id/items', (req, res) => {
  const loc = req.params.loc_id;

  db.getItems(loc, (err, info) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(info);
    }
  });
});

app.get('/api/location/:loc_id/lvls', (req, res) => {
  const loc = req.params.loc_id;

  db.getLevelCount(loc, (err, info) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(info);
    }
  });
});

app.get('/api/location/:loc_id', (req, res) => {
  const loc = req.params.loc_id;

  db.getLocInfo(loc, (err, info) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(info);
    }
  });
});

app.get('/api/blocks/level/:loc_id/:lvl', (req, res) => {
  const loc = req.params.loc_id;
  const lvl = req.params.lvl;

  db.getLocBlocks(loc, lvl, (err, info) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(info);
    }
  });
});

app.get('/api/blocks/items/:block_id', (req, res) => {
  const block = req.params.block_id;

  db.getItemsByBlock(block, (err, info) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(info);
    }
  });
});

app.get('/api/blocks/:loc_id/:x/:y/:level', (req, res) => {
  const loc_id = req.params.loc_id;
  const x = req.params.x;
  const y = req.params.y;
  const level = req.params.level;

  db.getBlockIdByCoordinates(loc_id, x, y, level, (err, info) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(info);
    }
  });
});

app.get('/api/stairs/:loc_id', (req, res) => {
  const loc_id = req.params.loc_id;

  db.getStairs(loc_id, (err, stairs) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(stairs);
    }
  });
});

app.listen(3000, () => {
  console.log(`App listening on 3000`)
});