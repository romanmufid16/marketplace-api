import midtransClient from "midtrans-client";
import dotenv from "dotenv";

dotenv.config();

export const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!
});