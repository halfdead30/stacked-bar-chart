const express = require("express");
const DataService = require("../services/DataService");
const router = express.Router();

router.get("/", (req, res) => {
  const language = req.query.language;

  DataService.list(language, (error, rows) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
      return;
    }
    res.status(200).json(rows);
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const checked = req.body.checked ? 1 : 0;

  DataService.put(id, checked, function (err) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    res.sendStatus(200);
  });
});

module.exports = router;
