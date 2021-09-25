import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://srikarst:srikar10@cluster0.gopsx.mongodb.net/cxserverdb?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3001, () => {
    console.log("Listening on port 3001!!!!!!!!");
  });
};

start();
