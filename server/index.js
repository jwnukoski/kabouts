const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./database.js');
const conn = require('../connection.js');


app.use(cors());

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

app.get('/api/blocks/:loc_id', (req, res) => {
  const loc = req.params.loc_id;

  db.getLocBlocks(loc, (err, info) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(info);
    }
  });
});

app.get('/api/blocks/:block_id/items', (req, res) => {
  const block = req.params.block_id;

  db.getItemsByBlock(block, (err, info) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(info);
    }
  });
});

app.get('/api/blocks/:loc_id/:x/:y', (req, res) => {
  const loc_id = req.params.loc_id;
  const x = req.params.x;
  const y = req.params.y;

  db.getBlockIdByCoordinates(loc_id, x, y, (err, info) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(info);
    }
  });
});

app.listen(3000, () => {
  console.log(`App listening on 3000`)
});