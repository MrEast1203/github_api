import express from "express";
import cors from "cors";
import routes from "./routes";
import dotenv from "dotenv-defaults";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
routes(app);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on port ${port}`));
