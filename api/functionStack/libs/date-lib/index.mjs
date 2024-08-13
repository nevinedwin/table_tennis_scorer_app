const moment = require("moment");

const dateFormat = "DD-MM-YYYY, HH:mm:ss";

const getCurrentDate = (day = 0) => {
  const currentDate = moment()
    .utcOffset("+05:30")
    .add(day, "d")
    .format(dateFormat);
  return currentDate;
};

const momentDate = (dateString) => {
  return moment(dateString, dateFormat);
};

const formatDate = (dateString) => {
  dateString =
    typeof dateString === "string"
      ? moment(dateString, dateFormat)
      : dateString;
  return dateString.utcOffset("+05:30").format(dateFormat);
};

module.exports = {
  getCurrentDate,
  momentDate,
  formatDate,
};
