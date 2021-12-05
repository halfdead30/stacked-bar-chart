const express = require("express");
const CitiesService = require("../services/CitiesService");
const router = express.Router();

router.get("/", (req, res) => {
  CitiesService.cities((error, rows) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
      return;
    }
    res.status(200).json(rows);
  });
});

router.put("/", (req, res) => {
  const checked = req.body.checked ? 1 : 0;

  CitiesService.put(checked, function (err) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    res.sendStatus(200);
  });
});

module.exports = router;
