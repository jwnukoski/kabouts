const conn = require('./connection.js')

module.exports.getLocInfo = function getLocInfo (locId, callback) {
  conn.dbConn.query('SELECT * FROM locations WHERE id = ?', [locId], (err, res) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, res)
    }
  })
}

module.exports.getItems = function getItems (locId, callback) {
  conn.dbConn.query('SELECT i.id,i.info, i.photo, b.id AS block_id, b.x, b.y, b.lvl FROM locations l LEFT JOIN blocks b ON b.loc_id = ? LEFT JOIN items i ON i.block_id = b.id', [locId], (err, res) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, res)
    }
  })
}

module.exports.getLocBlocks = function getLocBlocks (locId, lvl, callback) {
  conn.dbConn.query('SELECT * FROM blocks WHERE loc_id = ? AND lvl = ?', [locId, lvl], (err, res) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, res)
    }
  })
}

module.exports.getItemsByBlock = function getItemsByBlock (locId, callback) {
  conn.dbConn.query('SELECT * FROM items WHERE block_id = ?', [locId], (err, res) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, res)
    }
  })
}

module.exports.getBlockIdByCoordinates = function getBlockIdByCoordinates (locId, x, y, level, callback) {
  conn.dbConn.query('SELECT id FROM blocks WHERE loc_id = ? AND x = ? AND y = ? AND lvl = ?', [locId, x, y, level], (err, res) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, res)
    }
  })
}

module.exports.getLevelCount = function getLevelCount (locId, callback) {
  conn.dbConn.query('SELECT lvl FROM blocks WHERE loc_id = ? ORDER BY lvl DESC LIMIT 1', [locId], (err, res) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, res)
    }
  })
}

module.exports.getStairs = function getStairs (locId, callback) {
  conn.dbConn.query('SELECT on_lvl, to_lvl, x, y FROM stairs WHERE loc_id = ?', [locId], (err, res) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, res)
    }
  })
}
