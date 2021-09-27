import amqp, { connect, Connection, Channel } from "amqplib";

class RabbitWrapper {
  private connection?: Connection;
  private channel?: Channel;

  get client() {
    return this.channel;
  }

  async connect(url: string) {
    this.connection = await connect(url);
    this.channel = await this.connection.createChannel();
  }
}

export const rabbitWrapper = new RabbitWrapper();
