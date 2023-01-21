import {
  Subjects,
  Publisher,
  OrgCreatedEvent,
} from "@srikar-test/micro-common";

export class OrgCreatedPublisher extends Publisher<OrgCreatedEvent> {
  subject: OrgCreatedEvent["subject"] = Subjects.OrgCreated;
}
