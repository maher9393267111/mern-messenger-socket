const mongoose = require("mongoose");
require("dotenv").config();
module.exports = () => mongoose.connect("mongodb+srv://maher:maher9326@cluster0.nf63j.mongodb.net/chat-task?retryWrites=true&w=majority");
