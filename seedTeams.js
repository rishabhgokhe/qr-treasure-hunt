import mongoose from "mongoose";
import TeamData from "./models/SecondaryTeam.js";


const teams = [
  {
    teamId: "team001",
    codes: [
      { value: "3bdhLq2w", scanned: false },
      { value: "8xnAje6P", scanned: false },
      { value: "vP9dmR3Q", scanned: false },
      { value: "Kqw82jzE", scanned: false },
      { value: "cY9keZ1x", scanned: false },
      { value: "Zk3rN8Dw", scanned: false }
    ]
  },
  {
    teamId: "team002",
    codes: [
      { value: "Tq9LmY2x", scanned: false },
      { value: "Rw6Ajd8F", scanned: false },
      { value: "Up3cnV7K", scanned: false },
      { value: "Mqv72XpE", scanned: false },
      { value: "Ey1zcN0w", scanned: false },
      { value: "Lk8gF3Bq", scanned: false }
    ]
  }
];

async function insertTeams() {
  try {
    const MONGO_URI = process.env.MONGODB_URI;
    if (!MONGO_URI) throw new Error("Missing MONGO_URI in environment");

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected");

    await TeamData.insertMany(teams);
    console.log("✅ Teams inserted successfully");

    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error inserting teams:", error);
    await mongoose.disconnect();
  }
}

insertTeams();