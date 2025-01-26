const express = require("express");
const router = express.Router();
const Expense = require('../models/expense');
const auth = require("../middleware/auth");

// Create Expense
router.post("/create", auth, async (req, res) => {
  const { amount, matchId, date, payerId, partnerId } = req.body;

  try {
    const newExpense = new Expense({
      amount,
      matchId,
      date,
      payerId,
      partnerId,
    });
    await newExpense.save();
    res.status(201).json({ message: "Expense saved successfully", expense: newExpense });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get All Expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Expense by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid expense ID format" });
    }

    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
