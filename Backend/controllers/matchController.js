// ============================================
// Import Model
// ============================================

const Match = require("../models/Match");


// ============================================
// Save Match
// POST /matches
// ============================================
const saveMatch = async (req, res) => {

    try {

        console.log("========== NEW MATCH ==========");
        console.log(req.body);

        const match = await Match.create(req.body);

        console.log("Saved with ID:", match._id);

        res.status(201).json({
            success: true,
            message: "Match saved successfully.",
            data: match
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ============================================
// Get Match History
// GET /matches
// ============================================

const getMatches = async (req, res) => {

    try {

        const matches = await Match.find().sort({ date: -1 });

        res.status(200).json({

            success: true,
            count: matches.length,
            data: matches

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: "Failed to fetch match history.",
            error: error.message

        });

    }

};



// ============================================
// Export Functions
// ============================================

module.exports = {

    saveMatch,
    getMatches

};