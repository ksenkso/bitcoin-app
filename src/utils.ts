export const btcToString = (btc: number): string => `${btc.toFixed(8)} BTC`

export function intToFloatValue (value: number): number {
  const str = String(value).padStart(8, '0')
  return Number(`${str.substring(0, str.length - 8)}.${str.substring(str.length - 8)}`)
}
