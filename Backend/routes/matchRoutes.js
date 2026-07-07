const express = require("express");
const router = express.Router();

const {
    saveMatch,
    getMatches
} = require("../controllers/matchController");

router.post("/", saveMatch);
router.get("/", getMatches);

module.exports = router;