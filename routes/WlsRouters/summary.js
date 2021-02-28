const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const router = express.Router();

const summary = require("../../controllers/WlsController/summaryController");

router.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
router.use(bodyParser.json());

 router.post("/get_summary", summary.get_summary);

module.exports = router;
