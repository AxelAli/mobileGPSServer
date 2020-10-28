import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  fingerprintString: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Sign JWT
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1800s",
  });
};

const User = mongoose.model("User", UserSchema);

export default User;
