import mongoose from "mongoose";

// mongodb veritbanına bağlan
mongoose.connect(process.env.MONGO_URI);

// ayar
mongoose.Promise = global.Promise;

// şema oluştur
const VehicleSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  price: Number,
  color: String,
  mileage: Number,
  fuelType: String,
  transmission: String,
  condition: String,
  imageUrl: String,
});

// model ouştur
// performans açısından her importta yeni bir model oluşmamaası için önce mevcut modellerin arasıbda vehicle model var mı kontrol edicez varsa mevcut vehicle modeli export et yoksa yenisini oluşturup onu export eder
const Vehicle =
  mongoose.models?.Vehicle || mongoose.model("Vehicle", VehicleSchema);

export default Vehicle;
