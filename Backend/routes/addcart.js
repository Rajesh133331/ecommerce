const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { Cart } = require("../models/mongoSchema");

function authenticateToken(req, res, next) {
    
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "paruchurirajesh", (err, user) => {
    console.log(user);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

router.post('/',authenticateToken,async(req,res)=>{

    try{
    const {productid} = req.body;
    console.log(productid);

    await Cart.create({
      customer_email:req.user.email,
      product_id:productid
    });
    res.json({data:"success"})

    }
    catch(err){
        console.log(err)
        res.status(401).json({data:"fail"})

    }
})

router.post('/count',authenticateToken,async(req,res)=>{

    try{

        const email = req.user.email;

        const count = await Cart.find({ customer_email:email});

        console.log(count.length)
        res.send(count.length)

    }
    catch(err){
        console.log(err.message)
        res.json({data:"fail"})
    }

})


router.get("/checkout",authenticateToken,async(req,res)=>{
    try {
    const customer_email = req.user.email;

    
   const result = await Cart.aggregate([
     { $match: { customer_email } },
     {
       $addFields: {
         product_id_int: { $toInt: "$product_id" },
       },
     },
     {
       $lookup: {
         from: "products",
         localField: "product_id_int",
         foreignField: "productId",
         as: "productDetails",
         pipeline: [
           {
             $project: {
               _id: 0,
               productId: 1,
               productName: 1,
               imageurl: 1,
               price: 1,
             },
           },
         ],
       },
     },
     { $unwind: "$productDetails" },
     {
       $project: {
         _id: 0,
         productId: "$productDetails.productId",
         productName: "$productDetails.productName",
         imageurl: "$productDetails.imageurl",
         price: "$productDetails.price",
       },
     },
   ]);


    const totalAmount = result.reduce((sum, p) => sum + p.price, 0);

    res.status(200).json({ products: result, totalAmount });
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: "Error fetching checkout items" });
  }
});


router.get("/delete/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const customer_email = req.user.Email;

   await Cart.deleteOne({
      customer_email,
      product_id: id,
    });
    res.json({data:"success"})
  } catch (err) {
    console.log(err.message)
    res.json({data:"fail"})
  }
});


//remove cart after payment

router.post("/removecart",authenticateToken,async(req,res)=>{

  try{

    const email = req.user.email;
    await Cart.deleteMany({
      customer_email:email
    });

    res.json({data:"success"})
  }
  catch(err){
    console.log(err.message)
    res.json({data:"fail"})

  }

})
module.exports = router;
