import geocoder from '../utils/geocoder.js';
import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema(
	{
		home: {
			type: Object,
		},
		current: {
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
		currentLocation: {
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

LocationSchema.pre('save', async function (next) {
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

	if (this.current) {
		const loc1 = await geocoder.reverse(this.current);

		this.currentLocation = {
			type: 'Point',
			coordinates: [loc1[0].longitude, loc1[0].latitude],
			formattedAddress: loc1[0].formattedAddress,
			street: loc1[0].streetName,
			city: loc1[0].city,
			state: loc1[0].stateCode,
			zipcode: loc1[0].zipcode,
			country: loc1[0].countryCode,
		};

		this.current = undefined;
	}

	next();
});

const Location = mongoose.model('Location', LocationSchema);

export default Location;
