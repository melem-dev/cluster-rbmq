import amqplib from "amqplib";
import * as Protos from "../protos/index.js";

class Microservice {
  constructor() {
    this.url = process.env.RABBIT_MQ_URL || "amqp://localhost:5673";
  }

  async start() {
    try {
      this.conn = await amqplib.connect(this.url, "heartbeat=60");
      this.channel = await this.conn.createChannel();
      console.log(`[RabbitMQ] Connection is open`);
      console.log("[RabbitMQ] Registering consumers");
      for (let proto in Protos) await this.registerConsumers(Protos[proto]);
      console.log("[RabbitMQ] Initialized");
    } catch (error) {
      console.error(`[RabbitMQ]`, "Connection down, reason:", error.message);
    }
  }

  async registerConsumers(consumers) {
    for (let consumer of consumers) await this.consume(consumer);
  }

  async consume({ queue, cb }) {
    const channel = this.channel;
    await channel.assertQueue(queue, { durable: true });
    await channel.consume(queue, async (msg) => {
      cb(msg);
      channel.ack(msg);
    });
  }
}

export default new Microservice();
