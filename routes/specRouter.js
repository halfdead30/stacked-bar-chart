const express = require("express");
const SpecService = require("../services/SpecService");
const router = express.Router();

router.get("/", (req, res) => {
  SpecService.specialization((error, rows) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
      return;
    }
    res.status(200).json(rows);
  });
});

router.put("/", (req, res) => {
  const checkAll = req.body.checked ? 1 : 0;

  SpecService.checkAll(checkAll, function (err) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    res.sendStatus(200);
  });
});

router.put("/", (req, res) => {
  const spec = req.body.spec;

  SpecService.put(spec, function (err) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    res.sendStatus(200);
  });
});

module.exports = router;
