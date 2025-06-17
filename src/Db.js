require("dotenv").config();

const mongoose = require("mongoose");
const { dbUserName, dbPassword, dbCluster, dbName } = process.env;
const dbUri = `mongodb+srv://${dbUserName}:${dbPassword}@${dbCluster}.n7pdb.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const Shema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

mongoose.connect(dbUri)
    .then(() => console.log("Db Connected!"))
    .catch(() => console.log("Db Fail!"))

module.exports = mongoose.model("Event", Shema);