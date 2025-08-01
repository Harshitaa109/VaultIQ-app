const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Goal = require("../models/Goal");

// CREATE or UPDATE monthly goal
router.post("/", authMiddleware, async (req, res) => {
  const { incomeGoal, expenseGoal, month } = req.body;

  try {
    const goal = await Goal.findOneAndUpdate(
      { user: req.user.id, month }, // search condition
      {
        user: req.user.id, // ensure user is linked
        incomeGoal,
        expenseGoal,
        month,
      },
      {
        upsert: true, // create if not found
        new: true, // return updated doc
        setDefaultsOnInsert: true,
      }
    );

    res.status(200).json(goal);
  } catch (error) {
    console.error("Error setting monthly goal:", error);
    res.status(500).json({ message: "Failed to set goal" });
  }
});

// GET goal by month for the current user
router.get("/:month", authMiddleware, async (req, res) => {
  const { month } = req.params;

  try {
    const goal = await Goal.findOne({
      user: req.user.id,
      month,
    });

    res.status(200).json(goal || { incomeGoal: 0, expenseGoal: 0 });
  } catch (error) {
    console.error("Error fetching monthly goal:", error);
    res.status(500).json({ message: "Failed to fetch goal" });
  }
});

module.exports = router;