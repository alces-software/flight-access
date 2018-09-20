export function timestampToHoursAndMinutes({ timestamp }) {
  const date = new Date(timestamp * 1000);
  let hours = date.getHours();
  let mintues = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (mintues < 10) {
    mintues = `0${mintues}`;
  }
  return `${hours}:${mintues}`;
}
