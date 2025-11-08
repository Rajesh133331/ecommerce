const express = require("express");
const router = express.Router();

const { product } = require("../models/mongoSchema");

router.get("/bestsellingpro",async(req,res)=>{
     try {
       const bestSellers = await product.find({ category: "skin" });
       res.status(200).json(bestSellers);
     } catch (err) {
       res.status(500).json({ error: err.message });
     }
})

router.get("/list",async(req,res)=>{

  try{

  const list = await product.find();

  res.status(200).json(list)
  }
  catch(err){
    res.status(500).json({err : err.message})
  }

})

module.exports = router;