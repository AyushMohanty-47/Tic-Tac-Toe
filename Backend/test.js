const mongoose = require("mongoose");

const uri =
"mongodb+srv://eshan27_db_user:Ayush%409752@cluster0.ufjlfs5.mongodb.net/ticTacToeDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
.then(() => {
    console.log("✅ Connected!");
    process.exit();
})
.catch((err) => {
    console.error(err);
    process.exit();
});