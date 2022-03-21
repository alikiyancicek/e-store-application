let mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Order = mongoose.Schema(
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    price: { type: Number },
    qty: { type: Number },
    address: { type: String },
    deliveryNote: { type: String },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        price: { type: Number },
        qty: { type: Number },
      },
    ],
  },
  {
    collection: "orders",
  }
);

module.exports = mongoose.model("Order", Order);
