const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb+srv://asadalimcj:w3OyL66kT4eMnaz1@zearsports.w5h4a.mongodb.net/blogManager")
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

app.use('/api/', require('./routes/routers'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
