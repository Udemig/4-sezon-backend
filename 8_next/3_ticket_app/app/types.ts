export type TicketType = {
  _id: string;
  title: string;
  description: string;
  category: "Donanım Sorunu" | "Yazılım Sorunu" | "Bağlantı Sorunu";
  priority: 1 | 2 | 3 | 4 | 5;
  progress: number;
  status: "Başladı" | "Başlamadı" | "Bitti";
  createdAt: string;
};
