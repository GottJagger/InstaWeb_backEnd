const express = require('express');
const authRoute = require('./routes/auth');
const body_parser = require('body-parser')
const photoRoutes = require('./routes/photosRoutes');
const validate = require("./services/validate_token")

const app = express()

require('dotenv').config();
require('./database/db') 


app.use(body_parser.json());

app.use('/api', authRoute);

app.use('/fotos',photoRoutes);


const port = process.env.PORT || 3200;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


