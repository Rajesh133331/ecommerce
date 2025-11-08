const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/Ecommerce")
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });


  
const userSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
  Mobilenumber: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
  customer_email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  order_date: {
    type: Date,
    default: Date.now,
  },
  shipment_date: {
    type: Date,
    default: null,
  },
  delivered_date: {
    type: Date,
    default: null,
  },
  products: [
    {
      product_id: { type: String, required: true },
      quantity: { type: Number, required: true },
      price_at_purchase: { type: Number, required: true },
    },
  ],
  total_amount: {
    type: Number,
    required: true,
  },
  shipping_address: {
    address_line_1: { type: String, required: true },
    address_line_2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postal_code: { type: String, required: true },
    country: { type: String, required: true },
  },
});


const cartSchema = new mongoose.Schema({
  customer_email: { type: String, required: true },
  product_id: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productId: {
      type: Number,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["skin", "hair", "baby", "other"], // optional categories
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
const Order = mongoose.model("Order", orderSchema);
const User = mongoose.model("Users", userSchema);
const product = mongoose.model("products", productSchema);
module.exports = {User,Order,Cart,product}