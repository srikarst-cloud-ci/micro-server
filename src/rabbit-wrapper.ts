import amqp, { connect, Connection } from "amqplib";

class NatsWrapper {
  private _client?: Connection;

  get client() {
    if (!this._client) {
      throw new Error("Cannot access NATS client before connecting");
    }

    return this._client;
  }

  async start() {
    this._client = await connect("amqp://localhost");
  }
}

export const natsWrapper = new NatsWrapper();
