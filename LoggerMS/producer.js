const amqp = require("amqplib");
const connect = require("./config");
const config = require("./config");
// step 1: connect to the rabbitmq server
// step 2: Create a new channel on that connection
// step 3: Create the exchange
// step 4: Publish the message to exchange with a routing key

class Producer {
  channel;
  async createChannel() {
    const connection = await amqp.connect(connect.rabbitmq.url);
    this.channel = await connection.createChannel();
  }

  async publishMessge(routingKey, message) {
    if (!this.channel) {
      await this.createChannel();
    }
    const exchangeName = config.rabbitmq.exchangeName;
    await this.channel.assertExchange(exchangeName, "direct");
    let logDetails = {
      logType: routingKey,
      message: message,
      dateTime: new Date(),
    };
    await this.channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(logDetails))
    );
    console.log(`The message ${message} is sent to the  ${exchangeName}`);
  }
}

module.exports = Producer;
