const conn = require('../connection.js');

module.exports.getLocInfo = function getLocInfo(loc_id, callback) {
  conn.dbConn.query('SELECT * FROM locations WHERE id = ?', [loc_id], (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
}

module.exports.getItems = function getItems(loc_id, callback) {
  conn.dbConn.query('SELECT i.id,i.info, i.photo, b.id AS block_id, b.x, b.y FROM locations l LEFT JOIN blocks b ON b.loc_id = ? LEFT JOIN items i ON i.block_id = b.id', [loc_id], (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
}

module.exports.getLocBlocks = function getLocBlocks(loc_id, callback) {
  conn.dbConn.query('SELECT * FROM blocks where loc_id = ?', [loc_id], (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
}

module.exports.getItemsByBlock = function getItemsByBlock(block_id, callback) {
  conn.dbConn.query('SELECT * FROM items where block_id = ?', [block_id], (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
}

module.exports.getBlockIdByCoordinates = function getBlockIdByCoordinates(loc_id, x, y, callback) {
  conn.dbConn.query('SELECT id FROM blocks WHERE loc_id = ? AND x = ? AND y = ?', [loc_id, x, y], (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
}
