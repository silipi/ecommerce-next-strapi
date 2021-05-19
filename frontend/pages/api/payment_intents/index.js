const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const amount = req.body.cartData.totalValue; // Em reais;

    const payment_intent = await stripe.paymentIntents.create({
      amount: amount * 100, // Em centavos;
      currency: "brl",
      metadata: {
        integration_check: "accept_a_payment",
      },
    });

    res.status(200).json({ payment_intent });
  }
}
