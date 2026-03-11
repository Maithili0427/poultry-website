const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// serve images
app.use("/images", express.static(path.join(__dirname, "../public/images")));

mongoose.connect("mongodb://127.0.0.1:27017/farmDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const productSchema = new mongoose.Schema({
  slug: String,
  img: String,
  title: String,
  price: Number,
  wholesalePrice: Number,
  unit: String
});

const Product = mongoose.model("Product", productSchema);

// get products
app.get("/products", async (req,res)=>{
  const products = await Product.find();
  res.json(products);
});

// add products
app.get("/add-products", async (req,res)=>{

await Product.create([
{
slug:"eggs",
img:"/images/eggs-basket.jpg",
title:"Fresh Organic Eggs",
price:180,
wholesalePrice:150,
unit:"dozen"
},
{
slug:"chicks",
img:"/images/rooster-portrait.jpg",
title:"Day-Old Chicks",
price:40,
wholesalePrice:32,
unit:"chick"
},
{
slug:"feed",
img:"/images/poultry-feed.jpg",
title:"Premium Poultry Feed",
price:2000,
wholesalePrice:1700,
unit:"bag"
},
{
slug:"breeding",
img:"/images/chickens-feeding.jpg",
title:"Breeding Stock",
price:800,
wholesalePrice:680,
unit:"bird"
}
]);

res.send("Products Added Successfully");

});

app.listen(5000, ()=>{
console.log("Server running on port 5000");
});