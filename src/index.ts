import mongoose from "mongoose";

import { app } from "./app";

import { rabbitWrapper } from "./rabbit-wrapper";

const start = async () => {
  try {
    await rabbitWrapper.connect("amqp://localhost");
    console.log("Connected to RabbitMq");
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
