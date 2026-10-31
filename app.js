
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

const categoryRouter = require("./routes/category");
const brandRouter = require("./routes/brand");
const orderRouter = require("./routes/order");
const productRouter = require("./routes/product");
const customerRouter = require("./routes/cusromer");
const authRouter = require("./routes/auth");

const { verifyToken, isAdmin } = require("./middleware/auth-middleware");

app.use(cors());
app.use(express.json());

// MongoDB connection
async function connectDB() {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI environment variable is missing");
    }

    await mongoose.connect(process.env.MONGO_URI, {
        dbName: "e-comm-store-db"
    });

    console.log("Database connected");
}

// Connect to MongoDB before handling requests
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database connection error:", error.message);
        res.status(500).json({
            message: "Database connection failed"
        });
    }
});

app.get("/", (req, res) => {
    res.send("Server running");
});

app.use("/category", verifyToken, isAdmin, categoryRouter);
app.use("/brand", verifyToken, isAdmin, brandRouter);
app.use("/orders", verifyToken, isAdmin, orderRouter);
app.use("/product", verifyToken, isAdmin, productRouter);
app.use("/customer", customerRouter);
app.use("/auth", authRouter);

// Local development
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
