import express from "express";
import cors from "cors";
import "dotenv/config";
import visualizerRouter from "./src/routes/visualizerRouters.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => res.json({ message: "connected to api" }));

// Routes
app.use("/api/visualizer", visualizerRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server is running at port number ${port}`);
});
