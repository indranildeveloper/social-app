import express, { Application, Request, Response } from "express";

const app: Application = express();

app.get("/", (req: Request, res: Response): void => {
  res.send("<h1>This response is from server</h1>");
});

export default app;
