const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connecting to MongoDB without deprecated options
    const conn = await mongoose.connect(process.env.MONGO_URI); // Assuming MONGO_URI is set in .env
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;







// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect('mongodb://127.0.0.1:27017/userData', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error('Database connection error:', err);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
