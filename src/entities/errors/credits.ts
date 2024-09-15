export class InsufficientCreditsError extends Error {
    constructor(message: string, options?: ErrorOptions) {
      super(message, options);
    }
  }