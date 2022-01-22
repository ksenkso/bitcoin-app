// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export const log = (level: keyof Console, namespace: string, data: any): void => {
  console[level](namespace, JSON.stringify(data))
}
