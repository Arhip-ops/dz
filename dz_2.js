const moment = require("moment");
const express = require("express")

const app = express();
const PORT = 8000;

function getDate() {
  const date = moment().format("YYYY/DD/MM HH:mm:ss");
  console.log(date);
  return moment().format("YYYY/MM/DD HH:mm:ss");
}

function getCurrentWeekday() {
  const weekday = moment().format("dddd"); 
  console.log( weekday);
  return moment().format("dddd");
}

getDate();
getCurrentWeekday();

app.get("/timestamp", (req, res) => {
  res.json({
    timestamp: getDate(),
    weekday: getCurrentWeekday(),
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен`);
});