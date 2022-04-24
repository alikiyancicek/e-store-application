const express =  require('express');  
const router = new express.Router();
const Product = require('../model/product')

router.get('/search', (req,res) =>{
    if(!req.query.search){
    Product.find(function(err, products){
        res.render("search", { products : products})
    })
//Search bar
    }else {
        const productName = (req.query.search).toLowerCase(); // as it's a form with GET method, the req.query.search will refers to the input inside the form
        console.log(productName)
        Product.find({title: productName}, function (err, product){
            if (err){
                return res.render('index',{
                    message: "An error occured"
                })
            }
            if(product.length <= 0){ //so  if no match in the research
                return res.render('search',{
                    message : "Product not found"
                })
            }
            res.render('search', {products: product})
        })
    }
})

module.exports = router;