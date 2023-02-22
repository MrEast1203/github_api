import express from "express";
import cors from "cors";
import routes from "./routes";
import dotenv from "dotenv-defaults";
import path from "path";

const app = express();
dotenv.config();

if (process.env.NODE_ENV === "development") {
  app.use(cors());
}
app.use(express.json());
routes(app);
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../client", "build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on port ${port}`));
