require('dotenv').config();
const express = require('express');
const app = express();

const connectDB = require('./db/connect');

app.use(express.json());

// Routes
app.use('/contacts', require('./routes/contacts'));

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 8080;

//  ADD LOCALHOST URL DISPLAY
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});

// connect DB after server starts
connectDB();