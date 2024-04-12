const mongoose = require("mongoose");

// connection with mongoDB
async function connectMongoDB(url) {
    return mongoose.connect(url);
}

module.exports = {
    connectMongoDB,
};