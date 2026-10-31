const expores = require("express");
const mongoose = require("mongoose");
const app = expores();
const port = process.env.PORT || 3000;
const cors = require("cors");
const categoryRouter = require("./routes/category");
const brandRouter = require("./routes/brand");
const orderRouter = require("./routes/order");
const productRouter = require("./routes/product");
const customerRouter = require("./routes/cusromer");
const authRouter = require("./routes/auth");
const { verifyToken , isAdmin} = require("./middleware/auth-middleware");


app.use(cors());
app.use(expores.json());


app.get("/", (req,res) => {
    res.send("Server running");
})
app.use("/category",verifyToken, isAdmin, categoryRouter);
app.use("/brand", verifyToken, isAdmin, brandRouter);
app.use("/orders", verifyToken, isAdmin, orderRouter);
app.use("/product", verifyToken, isAdmin,  productRouter);
app.use("/customer", customerRouter);
app.use("/auth", authRouter);


async function connectDB() {
    await mongoose.connect("mongodb://localhost:27017", {
        dbName: "e-comm-store-db"
    })
    console.log("Database connected")
}
connectDB().catch((err) => {
    console.error(err)
})
app.listen(port, () => {
    console.log("Server running on port",port)
})