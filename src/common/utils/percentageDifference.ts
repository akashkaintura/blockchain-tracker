export function percentageDifference(
  oldValue: number,
  newValue: number,
): number {
  return ((newValue - oldValue) / oldValue) * 100;
}
