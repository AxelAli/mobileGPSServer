import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  fingerprintString: {
    type: String,
    unique: true,
    required: true,
  },
  pin: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt fingerprint
UserSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.pin = await bcrypt.hash(this.pin, salt);
});

// Sign JWT
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

UserSchema.methods.matchPin = async function(enteredPin) {
  return await bcrypt.compare(enteredPin, this.pin);
};

const User = mongoose.model("User", UserSchema);

export default User;
