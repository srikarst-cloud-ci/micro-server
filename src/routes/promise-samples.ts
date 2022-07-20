import { Router, Request, Response } from "express";
import { fetchDataUsingPromise } from "../services/api";

const router = Router();

router.get(
  "/api/promise-samples",
  async function (req: Request, res: Response) {
    const sample1Promise = fetchDataUsingPromise(
      "https://reqres.in/api/users?page=1"
    );
    const sample2Promise = fetchDataUsingPromise(
      "https://reqres.in/api/users?page=1"
    );
    // Promise.all([sample1Promise, sample2Promise])
    //   // .then((response: any) => JSON.parse(response)) // Only when the output is a string
    //   .then((output: ResponseOutput[]) =>
    //     res.status(output[0].status).send(output)
    //   )
    // .catch((output: ResponseOutput[]) =>
    //     res.status(output[0].status).send(output)
    //   );
    let output: ResponseOutput[];
    try {
      output = await Promise.all([sample1Promise, sample2Promise]);
    } catch (e) {
      output = [];
    }
    res.status(output[0]?.status).send(output);
  }
);

export { router as promiseSampleRouter };
