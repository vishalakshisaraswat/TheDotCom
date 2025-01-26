const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    matchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match", // Reference Match model
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    payerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference User model
      required: true,
    },
    partnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference User model
      required: true,
    },
  },{ timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
