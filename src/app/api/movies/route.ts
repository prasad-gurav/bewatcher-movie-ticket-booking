import React from 'react'
import { NextRequest, NextResponse } from 'next/server'


const formatDate = (date:Date) => {
    return date.toISOString().split('T')[0];
  };


export async function GET(request: NextRequest) {
    const todayDate = new Date();
    const fifteenDaysAgoDate = new Date(todayDate);
    fifteenDaysAgoDate.setDate(fifteenDaysAgoDate.getDate() - 30);
    
    const today = formatDate(todayDate);
    const fifteenDaysAgo = formatDate(fifteenDaysAgoDate);

    if (request.method === 'GET') {

        let headersList = {
            "accept": "application/json",
            "Authorization": "Bearer "
        }
        const movie_db_url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=hi-IN&page=1&sort_by=popularity.desc&with_release_type=2%7C3&release_date.gte=${fifteenDaysAgo}&release_date.lte=${today}&api_key=${process.env.MOVIE_DB_API_KEY!}&with_origin_country=IN`
        console.log(movie_db_url)
        let response = await fetch(movie_db_url, {
        method: "GET",
        headers: headersList
        });
        if (response.ok){
            const jsonData = await response.json();
            return NextResponse.json({
                data: jsonData
            }, {
                status: 200,
            })
        }
        return NextResponse.json({
            data: "await response.json()"
        }, {
            status: 200,
        })
    }
    return NextResponse.json({
        data: "GET Data"
    }, {
        status: 200,
    })

}
