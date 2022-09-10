export const Util: any = {
  getDateTime: (d: Date) => {
    return `${formatNumber(d.getDate())}/${formatNumber(d.getMonth() + 1)}/${formatNumber(d.getFullYear())} ${formatNumber(d.getHours())}:${formatNumber(d.getMinutes())}`;
  }
}

function formatNumber(n: any) {
  if (n >= 10)
    return n;
  else
    return '0' + n;
}
