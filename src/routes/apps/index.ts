import express, { Request, Response } from "express";
import { App } from "../../models/app";

const router = express.Router();

router.get("/api/apps", async (req: Request, res: Response) => {
  const apps = await App.find({});

  res.status(200).send(apps);
});

export { router as indexAppRouter };
export * from "./new";
