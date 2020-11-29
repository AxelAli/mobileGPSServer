import mongoose from 'mongoose';

const PointSchema = new mongoose.Schema({
	latitude: {
		type: Number,
		required: true,
	},
	longitude: {
		type: Number,
		required: true,
	},
	avgPrice: {
		type: Number,
		required: true,
	},
});

const LocationSchema = new mongoose.Schema({
	points: {
		type: [Object],
		required: true,
	},
});

const Location = mongoose.model('Location', LocationSchema);

export default Location;
