import express from "express";
import cookieSession from "cookie-session";
import "express-async-errors";
import { json } from "body-parser";

import { newOrganizationRouter } from "./routes/organizations/new";
import { callbackSampleRouter } from "./routes/callback-samples";
import { promiseSampleRouter } from "./routes/promise-samples";
import { asKeywordRuoter } from "./routes/as-keyword";
import { newAppRouter } from "./routes/apps";
import { indexAppRouter } from "./routes/apps";
import { errorHandler } from "@srikar-test/micro-common";
import { currentUser } from "@srikar-test/micro-common";
import { NotFoundError } from "@srikar-test/micro-common";

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
app.use(callbackSampleRouter);
app.use(promiseSampleRouter);
app.use(asKeywordRuoter);
app.use(indexAppRouter);
app.use(newAppRouter);

app.use(newOrganizationRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
