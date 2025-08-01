const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE a new transaction
router.post("/", authMiddleware, async (req, res) => {
  const { title, amount, type } = req.body;

  try {
    const transaction = new Transaction({
      user: req.user.id,
      title,
      amount,
      type,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    console.error("Error while creating transaction:", err);
    res.status(500).json({ message: "Error creating transaction" });
  }
});

// READ all transactions for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(transactions);
  } catch (err) {
    console.error("Error while fetching transactions:", err);
    res.status(500).json({ message: "Error fetching transactions" });
  }
});

//  GET summary: total income, expense, and balance
router.get("/summary", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });

    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    res.status(200).json({ income, expense, balance });
  } catch (err) {
    console.error("Error while getting summary:", err);
    res.status(500).json({ message: "Error getting summary" });
  }
});

// UPDATE a transaction by ID
router.put("/:id", authMiddleware, async (req, res) => {
  const { title, amount, type } = req.body;

  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, amount, type },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(transaction);
  } catch (err) {
    console.error("Error while updating transaction:", err);
    res.status(500).json({ message: "Error updating transaction" });
  }
});

// DELETE a transaction by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted" });
  } catch (err) {
    console.error("Error while deleting transaction:", err);
    res.status(500).json({ message: "Error deleting transaction" });
  }
});

module.exports = router;