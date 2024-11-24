declare module 'midtrans-client' {
  export class Snap {
    constructor(config: { isProduction: boolean; serverKey: string; clientKey?: string });
    createTransaction(transaction: object): Promise<{ redirect_url: string }>;
    transaction: {
      notification(notification: object): Promise<any>;
    };
  }
}
