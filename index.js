import express from "express";
import morgan from "morgan";
import favicon from "serve-favicon";
import path from "path";
import { fileURLToPath } from "url";
import request from "request";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 5000;

let app = express();
app.use(morgan("dev"));
app.use(favicon(path.join(__dirname, "public", "img", "favicon.ico")));
app.use(express.static("public"));

app.get("/", (_req, res) => {
  let md_html = "";
  request("http://localhost:3000/", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("Fetched HTML:", body); // Check what you're fetching
      md_html = body;
    } else {
      console.error("Error fetching HTML:", error);
    }
    res.render("index.ejs", {
      body: md_html,
      test: "Test",
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
