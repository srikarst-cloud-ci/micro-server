import amqp from "amqplib";
import _ from "lodash";

/**
 * @var {Promise<MessageBroker>}
 */
let instance: any;

/**
 * Broker for async messaging
 */
class MessageBroker {
  queues: any;
  connection: any;
  channel: any;
  /**
   * Trigger init connection method
   */
  constructor() {
    this.queues = {};
  }

  /**
   * Initialize connection to rabbitMQ
   */
  async init() {
    this.connection = await amqp.connect(
      process.env.RABBITMQ_URL || "amqp://localhost"
    );
    this.channel = await this.connection.createChannel();
    return this;
  }

  /**
   * Send message to queue
   * @param {String} queue Queue name
   * @param {Object} msg Message as Buffer
   */
  async send(queue: any, msg: any) {
    if (!this.connection) {
      await this.init();
    }
    console.log(msg);
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, msg);
  }

  /**
   * @param {String} queue Queue name
   * @param {Function} handler Handler that will be invoked with given message and acknowledge function (msg, ack)
   */
  async subscribe(queue: any, handler: any) {
    if (!this.connection) {
      await this.init();
    }
    if (this.queues[queue]) {
      const existingHandler = _.find(
        this.queues[queue],
        (h: any) => h === handler
      );
      if (existingHandler) {
        return () => this.unsubscribe(queue, existingHandler);
      }
      this.queues[queue].push(handler);
      return () => this.unsubscribe(queue, handler);
    }

    await this.channel.assertQueue(queue, { durable: true });
    this.queues[queue] = [handler];
    this.channel.consume(queue, async (msg: any) => {
      const ack = _.once(() => this.channel.ack(msg));
      this.queues[queue].forEach((h: any) => h(msg, ack));
    });
    return () => this.unsubscribe(queue, handler);
  }

  async unsubscribe(queue: any, handler: any) {
    _.pull(this.queues[queue], handler);
  }

  /**
   * @return {Promise<MessageBroker>}
   */
  async getInstance() {
    if (!instance) {
      instance = this.init();
    }
    return instance;
  }
}

export { MessageBroker };
