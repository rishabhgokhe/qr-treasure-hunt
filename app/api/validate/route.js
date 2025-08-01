// app/api/validate/route.js
import { connectToDB } from "@/utils/db";
import mongoose from "mongoose";

// Define schema
const ScanSchema = new mongoose.Schema(
  {
    team: {
      type: String,
      required: true,
      trim: true,
    },
    qrId: {
      type: String,
      required: true,
      trim: true,
    },
    scannedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Qr-Treasure-Hunt",
  }
);

const Scan = mongoose.models.Scan || mongoose.model("Scan", ScanSchema);

export async function POST(req) {
  try {
    await connectToDB();

    const { team, qrId } = await req.json();

    if (!team || !qrId) {
      return Response.json(
        { success: false, message: "Missing team or qrId" },
        { status: 400 }
      );
    }

    // Check if already scanned
    const alreadyScanned = await Scan.findOne({ team, qrId });
    if (alreadyScanned) {
      return Response.json(
        { success: false, message: "Already scanned" },
        { status: 200 }
      );
    }

    // Save new scan
    await Scan.create({ team, qrId });

    return Response.json(
      { success: true, message: "QR marked as done" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error validating QR:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}