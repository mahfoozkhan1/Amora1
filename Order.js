const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  items: Array,
  address: Object,
  email: String,
  paymentScreenshot: String,
  status: {
    type: String,
    default: "PENDING"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", OrderSchema);
