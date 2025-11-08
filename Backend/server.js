const express = require("express");
const app = express();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.json({ limit: "500mb" }));

const cors = require("cors")
app.use(cors())

const analysisRoutes = require('./routes/analysischeck');
const bestsellRoutes = require('./routes/products');
const authRoutes = require("./routes/authcheck");
const addcarts = require("./routes/addcart");

app.use("/analysischeck", analysisRoutes);
app.use("/products",bestsellRoutes);
app.use("/addcart",addcarts)

app.use("/api/auth", authRoutes);
app.listen(3000,(err)=>{
    if(err){
        console.log(`Error is ${err.message}`)
    }
    else{
        console.log("server running at port number 3000")
    }
})