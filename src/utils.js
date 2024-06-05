export function formatNumberShortcut(num) {
  if (num >= 1000000000) {
    // Billion
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  } else if (num >= 1000000) {
    // Million
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (num >= 1000) {
    // Thousand
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    return num.toString();
  }
}


export function msToMinutesAndSeconds(ms) {
  var minutes = Math.floor(ms / 60000);
  var seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
