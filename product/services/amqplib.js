import amqplib from "amqplib";

class Microservice {
  constructor(name) {
    this.name = name;
    this.url = process.env.RABBIT_MQ_URL || "amqp://localhost:5673";
  }

  async start() {
    try {
      this.conn = await amqplib.connect(this.url, "heartbeat=60");
      this.channel = await this.conn.createChannel();
      console.log(`[RabbitMQ] Connection is open`);
    } catch (error) {
      console.error(`[RabbitMQ]`, "Connection down, reason:", error.message);
    }
  }

  publish(queue, message) {
    const channel = this.channel;

    try {
      channel.sendToQueue(queue, Buffer.from(message));
    } catch (error) {
      console.log(`error to emit message in ${queue}, reason:`, error.message);
    }
  }
}

export default new Microservice();
