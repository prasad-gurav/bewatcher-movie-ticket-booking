import React from 'react'
import { NextRequest, NextResponse } from 'next/server'
import { todayFormatted,fifteenDaysAgoFormatted } from '@/utils/getDate'


export async function GET(request: NextRequest) {
    console.log(todayFormatted)
    if (request.method === 'GET') {

        let headersList = {
            "accept": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTIzYjlmYmU1OGViOTNmMDY3OTU5YjA2YTI5MmUxNyIsInN1YiI6IjY1YjkxNWFmOTBmY2EzMDE2MjA2NGE2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mu0VLv2Ltxh8GPLV7CQVTJ6RhEB-ZoW_4Nb5LYDtyBc"
        }
        const movie_db_url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=hi-IN&page=1&sort_by=popularity.desc&with_release_type=2%7C3&release_date.gte=${fifteenDaysAgoFormatted}&release_date.lte=${todayFormatted}&api_key=f523b9fbe58eb93f067959b06a292e17&with_origin_country=IN`

        let response = await fetch(movie_db_url, {
        method: "GET",
        // headers: headersList
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
