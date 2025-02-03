import express from "express";
import morgan from "morgan";
import favicon from "serve-favicon";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 5000;

let app = express();
app.use(morgan("dev"));
app.use(favicon(path.join(__dirname, "public", "img", "favicon.ico")));
app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.render("index.ejs", {
  });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
