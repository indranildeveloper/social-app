import colors from "colors";
import config from "./config/config";
import app from "./app";

const { PORT } = config;

app.listen(PORT, () => {
  console.log(colors.cyan(`Server is running on port: ${PORT}`));
});
