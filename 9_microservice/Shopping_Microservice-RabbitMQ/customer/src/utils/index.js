const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const amqplib = require("amqplib");
const {
  APP_SECRET,
  QUEUE_NAME,
  MESSAGE_BROKER_URL,
  EXCHANGE_NAME,
  CUSTOMER_BINDING_KEY,
} = require("../config");

//Utility functions
module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (
    (await this.GeneratePassword(enteredPassword, salt)) === savedPassword
  );
};

module.exports.GenerateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");
    console.log(signature);
    const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

//-------------------- MESSAGE BROKER SETUP -----------------------------//

//! kanal oluştur
module.exports.CreateChannel = async () => {
  try {
    // RabbitMQ sanal sunucusu ile bağlantı kur
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);

    // Sanal sunucuda bir iletişişm kanalı oluştur
    const channel = await connection.createChannel();

    // Kanala gelen mesjaları kuyruğa aktarıcak dağıtıcı ayarlıyoruz
    channel.assertExchange(EXCHANGE_NAME, "direct", false);

    // Kanalı return et
    return channel;
  } catch (err) {
    throw err;
  }
};

//! mesajlara abone ol
module.exports.SubscribeMessage = async (channel, service) => {
  // bir kuyruk oluştur
  const appQueue = channel.assertQueue(QUEUE_NAME);

  // kuyruğu belirli bir routing keye bağla
  channel.bindQueue(appQueue.queue, EXCHANGE_NAME, CUSTOMER_BINDING_KEY);

  // kuyruktaki mesajları al / abone ol
  channel.consume(
    appQueue.queue,
    (msg) => {
      if (msg.content) {
        console.log("💥 Kuyruktan mesaj geldi", msg.content.toString());
        service.SubscribeEvents(JSON.parse(msg.content.toString()));
      }
    },
    {
      noAck: true, // mesaj gelince rabbitMq'ya oto  onay gönder (kuyruk temizlendisin).
    }
  );
};

//! mesaj yayınla
// module.exports.PublishMessage = async (channel, key, message) => {
//   try {
//     await channel.publish(EXCHANGE_NAME, key, Buffer.from(message));
//     console.log("🎾 Mesaj Kanala Gönderildi");
//   } catch (err) {
//     throw err;
//   }
// };
