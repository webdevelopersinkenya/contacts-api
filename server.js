require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require("./routes/users");

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);


// Swagger FIRST
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/contacts', require('./routes/contacts'));

const connectDB = require('./db/connect');

const PORT = process.env.PORT || 10000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});
app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  });
});
connectDB();