import { Router, Request, Response } from "express";
import { App } from "../../models/app";

const router: Router = Router();

router.post("/api/apps", async function (req: Request, res: Response) {
  const { name, type } = req.body;

  const app = App.build({
    name,
    type,
    status: "Creating",
  });
  await app.save();
  res.status(200).send({ appId: app.id });
});

export { router as newAppRouter };
