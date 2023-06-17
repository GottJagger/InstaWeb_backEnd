const express = require('express');
const authRoute = require('./routes/auth');
require('dotenv').config();

const app = express();

app.use('/api', authRoute);

const port = process.env.PORT || 3200;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
