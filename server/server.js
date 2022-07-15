require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

////////////// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static("public"));

app.use(
  cors({
    origin: "http://localhost:5501",
  })
);
///////////////////////

app.get("/", (req, res) => {
  res.json({ page: "welcome page" });
});
app.get("/info", (req, res) => {
  res.json({ data: "hd" });
});
app.get("/about", (req, res) => {
  res.json({ page: "about page" });
});

////////// POST request //////
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
]);

app.post("/create-checkout-session", async (req, res) => {
  //   res.status(200).send("You're posted");

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),

      success_url: `${process.env.CLIENT_URL}/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
app.post("/postme", (req, res) => {
  //   res.status(200).send("You're posted");
  res.json({ url: "post page" });
});

///////////// litening port //////////
app.listen(3030, () => {
  console.log("your server is running on port 3030");
});

/////////////
