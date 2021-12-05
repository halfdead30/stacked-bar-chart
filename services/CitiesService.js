const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./dou_data.sqlite");

class CitiesService {
  cities(callback) {
    const query = "SELECT * FROM cities_state";

    db.all(query, callback);
  }

  put(checked, callback) {
    const query = "UPDATE cities_state SET checked = ?";

    db.run(query, checked, function (err) {
      callback.apply(this, arguments);
    });
  }
}

module.exports = new CitiesService();
