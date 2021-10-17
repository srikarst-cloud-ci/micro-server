import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Organization } from "../models/organization";
import { OrgStatus, requireAuth, validateRequest } from "@srikar-test/common";
import { OrgCreatedPublisher } from "../events/publishers/org-created-publisher";
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

    try {
      await new OrgCreatedPublisher(rabbitWrapper.client!).publish({ cloudCredentials, _id });
    } catch (e) {
      console.log(e);
    }
    res.status(201).send("New organization created");
  }
);

export { router as newOrganizationRouter };
