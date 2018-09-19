export function timestampToHoursAndMinutes({ timestamp }) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  let mintues = date.getMinutes();
  if (mintues < 10) {
    mintues = `0${mintues}`;
  }
  return `${hours}:${mintues}`;
}
