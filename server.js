require("dotenv").config();
const express = require("express");
const { connectDB } = require("./db/connect");
const contactsRoutes = require("./routes/contacts");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//  FIXED LINE
app.use("/contacts", contactsRoutes);

connectDB(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err.message);
  });