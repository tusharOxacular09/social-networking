import "dotenv/config.js";
import app from "./index.js";

// Listening the server on desired port
app.listen(process.env.PORT, () => {
  console.log(
    `Social networking server is running on port ${process.env.PORT} 🚀.`
  );
});
