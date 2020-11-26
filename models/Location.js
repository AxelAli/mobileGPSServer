import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
	coordinates: {
		type: [Object],
		required: true,
	},
	avgPrice: {
		type: Number,
		required: true,
	},
});

const Location = mongoose.model('Location', LocationSchema);

export default Location;
