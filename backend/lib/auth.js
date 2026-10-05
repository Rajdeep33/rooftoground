import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

await client.connect();

const db = client.db();

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,

  trustedOrigins: [
    "http://localhost:5173",
  ],

  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      userType: {
        type: "string",
        required: true,
        input: true,
        returned: true,
      },
    },
  },
});