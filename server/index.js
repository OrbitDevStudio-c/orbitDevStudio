require('dotenv').config();
const express = require('express');
const cors = require('cors');

const applyRoutes = require('./routes/apply');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/apply', applyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
