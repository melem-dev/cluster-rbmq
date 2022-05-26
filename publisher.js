import rbmq from "amqplib";

const rbmqURL = "amqp://localhost:5673";

main();

async function microservice(connection, channel) {
  const exchange = "products";
  const queue = "message_test";
  const routingKey = "products-test";

  await channel.assertExchange(exchange, "direct", { durable: true });
  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, exchange, routingKey);
  // prettier-ignore
  const msg = {'id': Math.floor(Math.random() * 1000), 'email': 'user@domail.com', name: 'firstname lastname'};
  await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(msg)));
  console.log("Message published");
}

async function main() {
  const connection = await rbmq.connect(rbmqURL, "hearbeat=60");
  const channel = await connection.createChannel();
  try {
    await microservice(connection, channel);
  } catch (error) {
    console.error("Error in publish message", error);
  } finally {
    console.log("Closing channel");
    await channel.close();
    await connection.close();
    console.log("Closed");
  }
}
