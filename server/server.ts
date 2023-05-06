import colors from "colors";
import connectDatabase from "./database/database";
import config from "./config/config";
import app from "./app";

const { PORT } = config;

const startServer: () => Promise<void> = async (): Promise<void> => {
  try {
    // Connecting to mongodb
    await connectDatabase();
    // Listening app
    app.listen(PORT, (): void => {
      console.log(colors.cyan(`Server is running on port: ${PORT}`));
    });
  } catch (error) {
    console.error(`Error: ${error}`.red.underline);
    process.exit(1);
  }
};

startServer();
