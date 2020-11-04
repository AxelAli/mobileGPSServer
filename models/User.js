import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
		},
		pin: {
			type: String,
			required: true,
			select: false,
		},
	},
	{ timestamps: true }
);

// Encrypt fingerprint
UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.pin = await bcrypt.hash(this.pin, salt);
});

// Sign JWT
UserSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.TOKEN_SECRET, {
		expiresIn: '30d',
	});
};

UserSchema.methods.matchPin = async function (enteredPin) {
	console.log(enteredPin);
	console.log(this.pin);
	return await bcrypt.compare(enteredPin, this.pin);
};

const User = mongoose.model('User', UserSchema);

export default User;
