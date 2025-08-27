import mongoose from "mongoose";

const PasswordSchema = new mongoose.Schema({
  websiteURL: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  encryptedPassword : {type : String, required : true}
}, { timestamps: true });

export default mongoose.models.Password || mongoose.model("Password", PasswordSchema);
