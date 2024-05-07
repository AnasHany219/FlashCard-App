const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    //Empty options at the monmet
  })
  .then((con) => {
    console.log("DB Connection Was Succesful 🥳");
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server is Listening on PORT ${port}`);
    });
  });
