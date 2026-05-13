require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Swagger FIRST (important)
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// THEN routes
app.use('/contacts', require('./routes/contacts'));

const connectDB = require('./db/connect');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
   console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});

connectDB();