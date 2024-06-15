const express = require("express");
const cors = require("cors");
const recipteRouter = require("./routes/recipeRoutes");

const app = express();

// cors hatalarını önleyen middleware (oto headerlar ekler)
app.use(cors());

// servera tarif ile alaklı routeları tanıttık
app.use(recipteRouter);

// dinlenicek portu belirle
app.listen(4001, () => {
  console.log("Server 4001 portu dinlemeye başladı");
});
