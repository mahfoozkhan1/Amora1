const express = require("express");
const router = express.Router();
const multer = require("multer");
const Order = require("../models/Order");
const sendEmail = require("../utils/email");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

router.post("/", upload.single("screenshot"), async (req, res) => {
  try {
    const order = new Order({
      items: JSON.parse(req.body.items),
      address: JSON.parse(req.body.address),
      email: req.body.email,
      paymentScreenshot: req.file.filename
    });

    await order.save();

    await sendEmail(
      req.body.email,
      "AMORA – Order Received",
      `<p>Your order has been received. We will verify payment and update you soon.</p>`
    );

    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

module.exports = router;
