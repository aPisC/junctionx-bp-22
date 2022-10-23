export function round(val: number) {
  if (Math.abs(val) < 1000) return Math.round(val * 100) / 100
  return Math.round(val)
}
