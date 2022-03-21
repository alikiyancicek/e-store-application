let mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productModel = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
        },
      },
    ],
    reviews: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        review: {
          type: String,
        },
      }
    ],
  },
  {
    collection: "products",
  }
);

//const Product = mongoose.model('Product', productSchema);

module.exports = mongoose.model("Product", productModel);
