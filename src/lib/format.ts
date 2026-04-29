// تمرير الأرقام بالإنجليزية فقط (0-9). نحتفظ بالدالة لتوحيد الواجهة.
export function toAr(input: number | string): string {
  return String(input);
}

export function fmt(n: number, opts?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat("en-US", opts).format(n);
}
