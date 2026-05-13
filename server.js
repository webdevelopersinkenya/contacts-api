require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const connectDB = require('./db/connect');

//  FIRST
app.use(cors());
app.use(express.json());

// Routes
app.use('/contacts', require('./routes/contacts'));

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
   console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});

connectDB();