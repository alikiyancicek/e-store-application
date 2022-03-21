let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");
let Cart = require("../models/cart");
let allProducts = require("../../allproducts.json");
let Product = require("../models/product");
const Order = require("../models/order");

module.exports.displayCart = (req, res, next) => {
  res.render("index", {
    title: "Cart",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.addToCart = (req, res, next) => {
  let productId = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function (err, product) {
    if (err) {
      return res.redirect("/");
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    res.redirect("back");
  });
};

module.exports.removeFromCart = (req, res, next) => {
  let productId = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect("/cart");
};

module.exports.positiveUpdateCart = (req, res, next) => {
  let productId = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.addByOne(productId);
  req.session.cart = cart;
  res.redirect("/cart");
};

module.exports.negativeUpdateCart = (req, res, next) => {
  let productId = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect("/cart");
};

module.exports.checkOutPage = (req, res) => {
  if (!req.user) {
    return res.send("Login to access this page");
  }
  res.render("partials/checkout", {
    title: "Checkout",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.checkOut = async (req, res, next) => {
  if (!req.user) {
    return res.send("Login to checkout");
  }

  console.log("dsajhdfsajkhdfsjkhjdfskh");
  const cart = req.session.cart;

  if (!cart.totalQty) {
    return res.send("No item(s) found the cart");
  }

  const { address = "", deliveryNote = "" } = req.body;

  const itemKeys = Object.keys(cart.items);

  const items = itemKeys.map((key) => {
    const item = cart.items[key];

    return {
      product: key,
      qty: item.qty,
      price: item.price,
    };
  });

  const order = {
    user: req.user._id,
    price: cart.totalPrice,
    qty: cart.totalQty,
    address,
    deliveryNote,
    items,
  };

  await Order.insertMany([order]);

  req.session.cart = { items: {}, totalPrice: 0, totalQty: 0 };

  res.redirect("/cart");
};

//payment
module.exports.paymentPage = (req, res) => {
  if (!req.user) {
    return res.send("Login to access this page");
  }
  res.render("partials/payment", {
    title: "Payment",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.payment = async (req, res, next) => {
  if (!req.user) {
    return res.send("Login to payment");
  }

  console.log("dsajhdfsajkhdfsjkhjdfskh");
  const cart = req.session.cart;

  if (!cart.totalQty) {
    return res.send("No item(s) found the cart");
  }

  const { address = "", deliveryNote = "" } = req.body;

  const itemKeys = Object.keys(cart.items);

  const items = itemKeys.map((key) => {
    const item = cart.items[key];

    return {
      product: key,
      qty: item.qty,
      price: item.price,
    };
  });

  const order = {
    user: req.user._id,
    price: cart.totalPrice,
    qty: cart.totalQty,
    address,
    deliveryNote,
    items,
  };

  await Order.insertMany([order]);

  req.session.cart = { items: {}, totalPrice: 0, totalQty: 0 };

  res.redirect("/cart");
};