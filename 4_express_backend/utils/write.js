const fs = require("fs");

module.exports = (data) => {
  fs.writeFile(`${__dirname}/../data/cars.json`, JSON.stringify(data),(err) => {
    if(err){
        console.log("Dosyayı güncellerken birsorun oluştu")
        console.log(err)
        }
    return
  });
};
