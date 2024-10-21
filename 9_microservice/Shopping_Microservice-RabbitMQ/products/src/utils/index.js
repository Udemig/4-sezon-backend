const bcrypt = require("bcrypt");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const amqplib = require("amqplib");
const {
  APP_SECRET,
  MESSAGE_BROKER_URL,
  EXCHANGE_NAME,
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

// customer api'ına haber verir
// module.exports.PublishCustomerEvent = (payload) => {
//   axios.post("http://127.0.0.1:8000/customer/app-events", { payload });
// };

// // shopping api'ına haber verir
// module.exports.PublishShoppingEvent = (payload) => {
//   axios.post("http://127.0.0.1:8000/shopping/app-events", { payload });
// };

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

//! mesaj yayınla
module.exports.PublishMessage = async (channel, key, message) => {
  try {
    await channel.publish(EXCHANGE_NAME, key, Buffer.from(message));
    console.log("🎾 Mesaj Kanala Gönderildi");
  } catch (err) {
    throw err;
  }
};

//! mesajlara abone ol
// module.exports.SubscribeMessage = async (channel, key) => {
//   // bir kuyruk oluştur
//   const appQueue = channel.assertQueue(QUEUE_NAME);

//   // kuyruğu belirli bir routing keye bağla
//   channel.bindQueue(appQueue.queue, EXCHANGE_NAME, key);

//   // kuyruktaki mesajları al / abone ol
//   channel.consume(appQueue.queue, (data) => {
//     console.log("⚾️ Kuyruktaji veri alındı");
//     console.log(data.content.toString());
//   });
// };
