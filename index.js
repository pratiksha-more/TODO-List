import express from "express";
import bodyParser from "body-parser";
import todoroute from "./routes/todoroute.js";
import connectToDb from "./controller/todocontroll.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

app.use("/", todoroute);

connectToDb();

app.listen(1000, () => {
  console.log("Post No:   1000");
});
