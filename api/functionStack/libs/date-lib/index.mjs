

export const formatDate = (date) => {
  const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
  return date.toLocaleDateString('en-IN', options);
};


export const formatTime = (date) => {
  const options = { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" };
  return date.toLocaleTimeString("en-IN", options);
};