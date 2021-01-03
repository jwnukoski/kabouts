const conn = require('./connection.js');

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

module.exports.getLocBlocks = function getLocBlocks(loc_id, lvl, callback) {
  conn.dbConn.query('SELECT * FROM blocks WHERE loc_id = ? AND lvl = ?', [loc_id, lvl], (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
}

module.exports.getItemsByBlock = function getItemsByBlock(block_id, callback) {
  conn.dbConn.query('SELECT * FROM items WHERE block_id = ?', [block_id], (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
}

module.exports.getBlockIdByCoordinates = function getBlockIdByCoordinates(loc_id, x, y, level, callback) {
  conn.dbConn.query('SELECT id FROM blocks WHERE loc_id = ? AND x = ? AND y = ? AND lvl = ?', [loc_id, x, y, level], (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
}

module.exports.getLevelCount = function getLevelCount(loc_id, callback) {
  conn.dbConn.query('SELECT lvl FROM blocks WHERE loc_id = ? ORDER BY lvl DESC LIMIT 1', [loc_id], (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
}

