import geocoder from '../utils/geocoder.js';
import mongoose from 'mongoose';

const HomeSchema = new mongoose.Schema(
	{
		home: {
			type: Object,
		},
		homeLocation: {
			type: {
				type: String,
				enum: ['Point'],
			},
			coordinates: {
				type: [Number],
				index: '2dsphere',
			},
			formattedAddress: String,
			street: String,
			city: String,
			state: String,
			zipcode: String,
			country: String,
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

HomeSchema.pre('save', async function (next) {
	if (this.home) {
		const loc = await geocoder.reverse(this.home);

		this.homeLocation = {
			type: 'Point',
			coordinates: [loc[0].longitude, loc[0].latitude],
			formattedAddress: loc[0].formattedAddress,
			street: loc[0].streetName,
			city: loc[0].city,
			state: loc[0].stateCode,
			zipcode: loc[0].zipcode,
			country: loc[0].countryCode,
		};

		this.home = undefined;
	}

	next();
});

const Home = mongoose.model('Home', HomeSchema);

export default Home;
