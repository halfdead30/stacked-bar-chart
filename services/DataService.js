const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./dou_data.sqlite");

class DataService {
  list(lang, callback) {
    const select = "SELECT * FROM dou_stats WHERE";
    const params = [lang];
    let query = "";

    if (lang.includes("QA")) {
      query = `${select} spec=?`;
    } else {
      query = `${select} language=?`;
    }

    db.all(query, params, callback);
  }

  put(id, checked, callback) {
    const select = "UPDATE cities_state SET checked = ? WHERE city_name = ?";
    const params = [checked, id];

    db.run(select, params, function (err) {
      callback.apply(this, arguments);
    });
  }
}

module.exports = new DataService();
