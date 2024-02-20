import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/database/dbConfig';
import Booking from '@/models/Bokings';
import formattedDate from '@/utils/todayDate'

connect()
export async function POST(request: NextRequest){
    try {
        let reqBody = await request.json()
        console.log(reqBody)
        let {Show, MovieId, Date} = reqBody
        let bookedSeats = await Booking.findOne({date : Date, movieId : MovieId,showtime: Show})
        console.log('res',bookedSeats)
        if(bookedSeats){
            console.log(bookedSeats)
            return NextResponse.json({
                data: bookedSeats.seats
            }, {
                status: 200,
            })
        }
        else{
            console.log("Not Found")
            return NextResponse.json({
                data: "Not Found"
            }, {
                status: 200,
            })
        }
    } catch (error) {
        
    }
}