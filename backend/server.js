const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const businessRoutes = require("./routes/business");
const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use("/api/business", businessRoutes);
/* SERVE IMAGES */
app.use("/images", express.static(path.join(__dirname, "../public/images")));

/* ROUTES */
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

/* DATABASE CONNECTION */
mongoose.connect("mongodb://127.0.0.1:27017/farmDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* PRODUCT MODEL */
const productSchema = new mongoose.Schema({
  slug: String,
  img: String,
  title: String,
  price: Number,
  wholesalePrice: Number,
  unit: String
});

const Product = mongoose.model("Product", productSchema);

/* GET PRODUCTS */
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

/* ADD SAMPLE PRODUCTS */
app.get("/add-products", async (req, res) => {

  await Product.create([
    {
      slug: "eggs",
      img: "/images/eggs-basket.jpg",
      title: "Fresh Organic Eggs",
      price: 180,
      wholesalePrice: 150,
      unit: "dozen"
    },
    {
      slug: "chicks",
      img: "/images/rooster-portrait.jpg",
      title: "Day-Old Chicks",
      price: 40,
      wholesalePrice: 32,
      unit: "chick"
    },
    {
      slug: "feed",
      img: "/images/poultry-feed.jpg",
      title: "Premium Poultry Feed",
      price: 2000,
      wholesalePrice: 1700,
      unit: "bag"
    },
    {
      slug: "breeding",
      img: "/images/chickens-feeding.jpg",
      title: "Breeding Stock",
      price: 800,
      wholesalePrice: 680,
      unit: "bird"
    }
  ]);

  res.send("Products Added Successfully");

});

/* START SERVER */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});