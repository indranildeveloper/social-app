import colors from "colors";
import connectDatabase from "./database/database";
import config from "./config/config";
import app from "./app";

const { PORT } = config;

// Connecting to mongodb
// TODO: Refactor connection
connectDatabase();
// Listening app
app.listen(PORT, (): void => {
  console.log(colors.cyan(`Server is running on port: ${PORT}`));
});
