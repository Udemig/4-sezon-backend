import mongoose, { mongo, Schema } from "mongoose";

// veritbanına bağlan
mongoose.connect(process.env.MONGO_URI as string);
// asenkron işlemler için ayar
mongoose.Promise = global.Promise;

// ticket verisi için bir şablon oluştur
const ticketSchema = new Schema(
  {
    title: String,
    description: String,
    category: String,
    priority: Number,
    progress: Number,
    status: String,
  },
  {
    timestamps: true,
  }
);

// ticket verilerini yönetebilmek için model oluştur
// eğer ki daha önce oluşturulan aynı modalen varsa onu kullan yoksa yenisinin oluştur
const Ticket =
  mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export default Ticket;
