// ============================================
// Import Mongoose
// ============================================

const mongoose = require("mongoose");


// ============================================
// Match Schema
// ============================================

const matchSchema = new mongoose.Schema({

    playerName: {

        type: String,
        required: true,
        trim: true

    },

    winner: {

        type: String,
        required: true

    },

    moves: {

        type: Number,
        required: true

    },

    date: {

        type: Date,
        default: Date.now

    }

});


// ============================================
// Export Model
// ============================================

module.exports = mongoose.model("Match", matchSchema);