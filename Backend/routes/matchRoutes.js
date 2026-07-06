// ============================================
// Import Express
// ============================================

const express = require("express");

const router = express.Router();


// ============================================
// Import Controller
// ============================================

const {

    saveMatch,
    getMatches

} = require("../controllers/matchController");


// ============================================
// Routes
// ============================================

// Save Match
router.post("/", saveMatch);
router.get("/", getMatches);


// ============================================
// Export Router
// ============================================

module.exports = router;