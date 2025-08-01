const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  incomeGoal: {
    type: Number,
    default: 0,
  },
  expenseGoal: {
    type: Number,
    default: 0,
  },
});

goalSchema.index({ user: 1, month: 1 }, { unique: true });
module.exports = mongoose.model("Goal", goalSchema);