const expores = require("express");
const mongoose = require("mongoose");
const app = expores();
const port = 3000;
const cors = require("cors");
const categoryRouter = require("./routes/category");


app.use(cors());
app.use(expores.json());


app.get("/", (req,res) => {
    res.send("Server running");
})
app.use("/category", categoryRouter);


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