import mongoose from "mongoose";

const CodeSchema = new mongoose.Schema({
  value: { type: String, required: true },
  scanned: { type: Boolean, default: false },
});

const TeamSchema = new mongoose.Schema(
  {
    teamId: { type: String, required: true, unique: true },
    codes: [CodeSchema],
  },
  { collection: "Team-Codes" }
);

const TeamData = mongoose.models.TeamData || mongoose.model("TeamData", TeamSchema);
export default TeamData;