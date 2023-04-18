import express, { Application, Request, Response } from "express";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
// Routes
import auth from "./routes/auth";
import user from "./routes/user";
import profile from "./routes/profile";
import post from "./routes/post";
import errorMiddleware from "./middlewares/errorMiddleware";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compress());
app.use(cors());
app.use(helmet());
app.use(errorMiddleware);

// Mount Routes
app.use("/api", auth);
app.use("/api", user);
app.use("/api", profile);
app.use("/api", post);

app.get("/", (req: Request, res: Response): void => {
  res.send("<h1>This response is from server</h1>");
});

export default app;
