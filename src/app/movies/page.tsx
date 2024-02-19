'use client'
import React, { useContext,MouseEvent, useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { BookingContx } from '@/context/BookingContext'
import { MovieContx } from '@/context/MoviesContext'


function MoviesPage() {

    const { movies_data } = useContext(MovieContx)

    const { movieId,handleSetMovie } = useContext(BookingContx);

    const handleBookMyTicket = (e: MouseEvent<HTMLButtonElement>, movieId: number) => {
        console.log(movieId)
        // router.push("/audi?movie_id=" + movieId)
    }
    return (
        <div className='flex flex-col w-[80%] mx-auto'>
            <h2 className='text-4xl py-4 px-10 font-manrope'>Now Playing</h2>
            <div className='flex flex-wrap gap-4   items-center px-10'>
                {Array.isArray(movies_data) ?
                <>
                    {movies_data.map((movie:any, index:number) => (
                    <div key={index} className='w-[200px]'>
                        <img className='' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
                        <h2 className='py-2'>{movie.original_title}</h2>
                        <button onClick={(e: MouseEvent<HTMLButtonElement>) => handleSetMovie(e, Number(movies_data.indexOf(movie)))} className='cursor-pointer bg-blue-500 px-4 py-2 rounded-md my-2'>BookMyTicket</button>
                    </div>
                ))}
                </>:<></>}
            </div>
        </div>
    )
}

export default MoviesPage
