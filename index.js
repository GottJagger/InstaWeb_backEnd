const express = require('express');
const authRoute = require('./routes/auth');
const app = express()

require('dotenv').config();
require('./database/db') 



app.use('/api', authRoute);

const port = process.env.PORT || 3200;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
