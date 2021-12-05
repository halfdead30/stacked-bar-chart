const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./dou_data.sqlite");

class SpecService {
  specialization(callback) {
    const query = "SELECT * FROM current_spec";

    db.all(query, callback);
  }

  checkAll(checkAll, callback) {
    const query = "UPDATE current_spec SET checkAll = ?";

    db.run(query, checkAll, function (err) {
      callback.apply(this, arguments);
    });
  }

  get(callback) {
    const query = "SELECT checkAll FROM current_spec";

    db.all(query, callback);
  }

  put(spec, callback) {
    const query = "UPDATE current_spec SET spec = ?";

    db.run(query, spec, function (err) {
      callback.apply(this, arguments);
    });
  }
}

module.exports = new SpecService();
