const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
const mongoose = require('mongoose');

const DB = process.env.DATABASE_LOCAL;
mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection was successful');
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });

console.log('Environment: ', process.env.NODE_ENV);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening for request on port ${PORT}`);
});
