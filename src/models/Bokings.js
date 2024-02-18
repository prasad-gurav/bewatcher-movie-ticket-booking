import mongoose, { Schema } from "mongoose";
import { connect } from '@/database/dbConfig'

connect()

const bookingSchema = new mongoose.Schema({
    movieId:{
        type : String,
        required:true,
    },
    date: { 
        type: String, required: true 
    },
    showtime: { type: String, required: true },
    seats: [{ type: String }], 
})
const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;
