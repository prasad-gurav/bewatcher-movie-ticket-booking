"use client";
import React, { useContext, MouseEvent, useEffect } from "react";


import { BookingContx } from "@/context/BookingContext";
import { MovieContx } from "@/context/MoviesContext";

function MoviesPage() {
    const { movies_data } = useContext(MovieContx);

    const { movieId, handleSetMovie } = useContext(BookingContx);

    return (
        <div className="flex flex-col w-[80%] mx-auto">
   
            <div className="flex flex-wrap gap-10 items-center justify-center py-4 my-8 mx-2">
                {Array.isArray(movies_data) ? (
                    <>
                        {movies_data.map((movie: any, index: number) => (
                            <div
                                key={index}
                                className="w-[200px] h-[420px] flex flex-col justify-between "
                            >
                                <img
                                    className=""
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt=""
                                />
                                <h2 className="py-2">{movie.original_title}</h2>
                                <div>
                                    <button
                                        onClick={(
                                            e: MouseEvent<HTMLButtonElement>
                                        ) =>
                                            handleSetMovie(
                                                e,
                                                Number(
                                                    movies_data.indexOf(movie)
                                                )
                                            )
                                        }
                                        className="cursor-pointer bg-blue-500 px-4 py-2 rounded-md my-2 hover:bg-slate-900 "
                                    >
                                        BookMyTicket
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default MoviesPage;
