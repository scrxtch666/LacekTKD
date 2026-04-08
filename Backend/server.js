require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./Libs/db");
const router = require("./Routes/Router");
const bannerRouter = require("./Routes/Banner/RouterBanner");
const authRouter = require("./auth/RouterAuth");

const app = express();

// ─── CORS ───
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
//app.use(express.static(path.join(__dirname, "public")));

// ─── ROUTERY ───
app.use("/api", router);
app.use("/api/banner", bannerRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Server běží správně! 🚀");
});

app.listen(3000, () => console.log("🚀 Server běží na http://localhost:3000"));