const mongoose = require('mongoose');

try {
  mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  console.log('MongoDB connected');
} catch (error) {
  console.log(error.message);
}
