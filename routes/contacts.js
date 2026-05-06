const express = require("express");
const { ObjectId } = require("mongodb");
const { getDB } = require("../db/connect");


const router = express.Router();

// GET all contacts
router.get("/", async (req, res) => {
  try {
    const db = getDB();
    const contacts = await db.collection("contacts").find().toArray();

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single contact by ID
router.get("/:id", async (req, res) => {
  try {
    const db = getDB();
    const id = req.params.id;

    const contact = await db.collection("contacts").findOne({
      _id: new ObjectId(id)
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;