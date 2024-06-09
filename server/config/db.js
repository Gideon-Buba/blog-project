const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connect = await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
    console.log(`Database Connected: ${connect.connection.host}`); 
  } catch (err) {
    console.log(err);
  }
};


module.exports = connectDB;
