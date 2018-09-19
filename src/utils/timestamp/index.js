// @flow
export default function convertTimestamp(timestamp: number) {
  const d = new Date(timestamp * 1000);
  const yyyy = d.getUTCFullYear();
  const mm = ('0' + (d.getUTCMonth() + 1)).slice(-2);
  const dd = ('0' + d.getUTCDate()).slice(-2);
  const hh = d.getUTCHours();
  let h = hh;
  const min = ('0' + d.getUTCMinutes()).slice(-2);
  let ampm = 'AM';
  let time;

  if (hh > 12) {
    h = hh - 12;
    ampm = 'PM';
  } else if (hh === 12) {
    h = 12;
    ampm = 'PM';
  } else if (hh === 0) {
    h = 12;
  }

  time = dd + '/' + mm + '/' + yyyy + ', ' + h + ':' + min + ' ' + ampm;

  return time;
}