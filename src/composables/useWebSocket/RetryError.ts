export class RetryError extends Error {
  constructor (maxRetries: number) {
    super(`Maximum number of retries exceeded: ${maxRetries}`)
  }
}
