let moment = require("moment");

function getDate() {
  const date = moment().format("YYYY/DD/MM HH:mm:ss");
  console.log(date);
}
function getCurrentWeekday() {
  const weekday = moment().format("dddd"); 
  console.log( weekday);
}

getDate();
getCurrentWeekday();