const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const sendEmail = require("../utils/email");

router.get("/", async (req, res) => {
  if (req.headers.password !== process.env.ADMIN_PASSWORD)
    return res.status(401).json({ error: "Unauthorized" });

  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

router.post("/update", async (req, res) => {
  const { id, status } = req.body;

  const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

  if (status === "PAID") {
    await sendEmail(
      order.email,
      "AMORA – Payment Confirmed",
      `<p>Your payment has been confirmed. Thank you for shopping with AMORA.</p>`
    );
  }

  res.json({ success: true });
});

module.exports = router;
