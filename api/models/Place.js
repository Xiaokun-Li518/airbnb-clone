import mongoose from "mongoose";

const {Schema} = mongoose;

const UserSchema = new Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    address: String,
    photos: [String], 
    description: String, 
    perks: [String],
    extraInfo: String,
    checkIn: Number, 
    checkOut: Number,
    maxGuests: Number,
});


const PlaceModel = mongoose.model('Place', UserSchema);


export default PlaceModel;