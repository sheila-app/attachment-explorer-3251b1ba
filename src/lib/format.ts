// تحويل الأرقام إلى الأرقام العربيّة (الهنديّة) لاتّساق اللغة
const AR = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export function toAr(input: number | string): string {
  return String(input).replace(/[0-9]/g, (d) => AR[+d]);
}
