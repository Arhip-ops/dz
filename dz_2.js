let moment = require("moment");

function getDate() {
  const date = moment().format("YYYY/DD/MM HH:mm:ss");
  console.log(date);
}

getDate();