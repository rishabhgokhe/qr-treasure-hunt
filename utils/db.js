// utils/db.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

// Ensure the URI has the database name
// e.g., mongodb+srv://user:pass@cluster.mongodb.net/Treasure-Hunt
if (!MONGODB_URI.includes("Treasure-Hunt")) {
  throw new Error("Your MongoDB URI must include the database name 'Treasure-Hunt'");
}

let cached = global.mongoose || { conn: null, promise: null };

export async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: "Treasure-Hunt", // Optional if db is in URI, but added for clarity
    });
  }

  cached.conn = await cached.promise;

  console.log("✅ MongoDB connected to database: Treasure-Hunt");
  return cached.conn;
}