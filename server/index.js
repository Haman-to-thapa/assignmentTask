require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 4242;

const allowedOrigins = [
  "http://localhost:5173",

];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(bodyParser.json());

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Top Up Points",
            },
            unit_amount: 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // success_url: "https://candidate-001-konnectimpact-module-payments.vercel.app/success",
      // cancel_url: "https://candidate-001-konnectimpact-module-payments.vercel.app/failure",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/failure",

    });

    res.json({ id: session.id }); 

  } catch (error) {
    console.error("Checkout Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));