import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Organization } from "../models/organization";
import { OrgStatus, requireAuth, validateRequest } from "@srikar-test/common";
import { OrgCreatedPublisher } from "../events/publishers/org-created-publisher";
import { MessageBroker } from "../rabbit";
import { rabbitWrapper } from "../rabbit-wrapper";

const router = express.Router();

router.post(
  "/api/organizations",
  requireAuth,
  [
    body("cloudCredentials")
      .not()
      .isEmpty()
      .withMessage("Cloud credentials required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { cloudCredentials } = req.body;
    const _id = req.currentUser!.id;

    const organization = Organization.build({ cloudCredentials, _id });
    await organization.save();

    // const broker = new MessageBroker();
    // const instance = await broker.getInstance();
    // console.log(JSON.stringify(req.body));
    // await instance.send("test", Buffer.from(JSON.stringify(req.body)));

    // Publish an event saying that an order was created
    try {
      await new OrgCreatedPublisher(rabbitWrapper.client!).publish({
        id: organization.id,
        version: 1,
        status: OrgStatus.Created,
        userId: _id,
      });
    } catch (e) {
      console.log(e);
    }
    res.status(201).send("New organization created");
  }
);

export { router as newOrganizationRouter };
