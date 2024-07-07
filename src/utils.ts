export function formatNumberShortcut(num: number): string {
  if (num >= 1000000000) {
    // Billion
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  } else if (num >= 1000000) {
    // Million
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (num >= 1000) {
    // Thousand
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  } else {
    return num.toString();
  }
}

export function msToMinutesAndSeconds(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ':' + (Number(seconds) < 10 ? '0' : '') + seconds;
}

export function isIncludeHtml(string: string): boolean {
  if (typeof string !== 'string') {
    return false;
  }

  const regex = /href=([^" >]+)/g;
  const isIncludeHtmlTag = string.match(regex);
  return !!isIncludeHtmlTag && isIncludeHtmlTag.length > 0;
}


export function makeArrayUnique<T extends { id: string | number }>(items: T[]): T[] {
  return [...new Map(items.map(item => [item.id, item])).values()];
}
