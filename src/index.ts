import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import sessionHandler from "./middlewares/session";
import errorHandler from "./middlewares/error";
import authRouter from "./routers/auth.router";

const morgan = require("morgan");
const app = express();
const port = 5500;
configDotenv();

const allowedOrigins = [
  "http://localhost:4200",
];

const corsOptions = {
  origin: (origin:any, callback:any) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(express.json());
app.use(cookieParser());
app.use(sessionHandler());
app.use(cors(corsOptions));
app.use(errorHandler);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use("/auth", authRouter);

app.listen(port, () => console.log(`Escuchando al puerto ${port}`));

export default app;
