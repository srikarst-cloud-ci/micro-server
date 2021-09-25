import express from "express";
import cookieSession from "cookie-session";
import "express-async-errors";
import { json } from "body-parser";

import { newOrganizationRouter } from "./routes/new";
import { errorHandler } from "@srikar-test/common";
import { currentUser } from "@srikar-test/common";
import { NotFoundError } from "@srikar-test/common";

const app = express();
app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
app.use(currentUser);

app.use(newOrganizationRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
