const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection was successful');
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening for request on port ${PORT}`);
});
