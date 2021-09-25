import { Subjects, Publisher, OrgCreatedEvent } from "@srikar-test/common";

export class OrgCreatedPublisher extends Publisher<OrgCreatedEvent> {
  subject: Subjects.OrgCreated = Subjects.OrgCreated;
}
