import Bookings from '../../models/Bokings'
import { NextRequest, NextResponse } from 'next/server'
import { connect } from '@/database/dbConfig'
import formattedDate from '@/utils/todayDate'

connect()

export async function POST(request: NextRequest) {
    try {
        let reqBody = await request.json()
        console.log(reqBody)
        let { Show, MovieId, Date, seats } = reqBody

        let existingShow = await Bookings.findOneAndUpdate(
            { date: formattedDate, movieId: MovieId }, 
            { $push: { seats: { $each: seats } } }, 
            { new: true } // Set to true to return the modified document rather than the original
        )
        if (existingShow) {
            console.log("Seats updated successfully:", existingShow);
        
        }
        else{
            console.log("show dosent exist");
            const newBooking = new Bookings({
                showtime: Show,
                movieId: MovieId,
                date: Date,
                seats: seats
            })
            const bookingStat = await newBooking.save()
            console.log(bookingStat)
        }
    }
    catch (e: any) {
        return NextResponse.json({
            data: "Something Went Wrong"
        }, {
            status: 200,
        })
    }

    return NextResponse.json({
        data: "Booked"
    }, {
        status: 200,
    })

}