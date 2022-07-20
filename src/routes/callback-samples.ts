import { Router, Request, Response } from "express";
import { fetchDataUsingCallback } from "../services/api";

const router: Router = Router();

router.get("/api/callback-samples", function (req: Request, res: Response) {
  fetchDataUsingCallback(
    "https://reqres.in/api/users?page=2",
    (output: ResponseOutput) => {
      const { status, data }: { status: number; data: any } = output;
      res.status(status).send(data);
    },
    (output: ResponseOutput) => {
      const { status, data }: { status: number; data: any } = output;
      res.status(status).send(data);
    }
  );
});

export { router as callbackSampleRouter };
