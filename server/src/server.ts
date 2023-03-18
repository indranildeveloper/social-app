import colors from "colors";
import connectDB from "./database/database";
import config from "./config/config";
import app from "./app";

const { PORT } = config;

// Connecting to mongodb
connectDB();
// Listening app
app.listen(PORT, (): void => {
  console.log(colors.cyan(`Server is running on port: ${PORT}`));
});
