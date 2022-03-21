let express = require("express");
let router = express.Router();

let cartController = require("../controllers/cart");

router.get("/add/:id", cartController.addToCart);
router.get("/remove/:id", cartController.removeFromCart);
router.get("/positive-update/:id", cartController.positiveUpdateCart);
router.get("/negative-update/:id", cartController.negativeUpdateCart);
router.get("/checkout", cartController.checkOutPage);
router.get("/", cartController.displayCart);
router.post("/checkout", cartController.checkOut);
router.get("/payment", cartController.paymentPage);
router.post("/payment", cartController.payment);

module.exports = router;
