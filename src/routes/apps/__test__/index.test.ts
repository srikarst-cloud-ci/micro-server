import request from "supertest";
import { app } from "../../../app";

it("fetches apps", async () => {
  const response1 = await request(app).post("/api/apps").send({
    name: "test02",
    type: "test-app",
    status: "Creating",
  });
  const response = await request(app).get("/api/apps").expect(200);
  expect(response.body[0].appId).toEqual(response1.body.id);
});
