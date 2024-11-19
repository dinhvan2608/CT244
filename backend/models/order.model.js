const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: String,
    bookId: String,
    quantity: Number,
    borrowDate: Date,
    returnDate: Date,
    returnQuantity: Number,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema, "orders");

module.exports = Order;
