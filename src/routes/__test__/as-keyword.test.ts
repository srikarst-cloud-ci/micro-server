import request from "supertest";
import { app } from "../../app";

it("fetches orders for an particular user", async () => {
  // Create three tickets
  // Create one order as User #1
  const response = await request(app).get("/api/as-keyword").expect(200);

  // Create two orders as User #2

  // Make request to get orders for User #2

  // Make sure we only got the orders for User #2
  expect(response.body).toEqual({ msg: "done" });
});
