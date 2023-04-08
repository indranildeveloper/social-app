import express, { Application, Request, Response } from "express";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
// Routes
import authRoutes from "./routes/authRoutes";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compress());
app.use(cors());
app.use(helmet());

app.use("/api", authRoutes);

app.get("/", (req: Request, res: Response): void => {
  res.send("<h1>This response is from server</h1>");
});

export default app;
