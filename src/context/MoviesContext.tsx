'use client'
import React, { useEffect } from 'react'


interface MovieContextType{
    movies_data: any,

}
const defaultMovieContx = {
    movies_data : [],

}
export const MovieContx = React.createContext<MovieContextType>(defaultMovieContx)
type Props = {
    children: React.ReactNode;
};
export default function MoviesContext(props:Props) {
    const [movies_data,setMovies_data] = React.useState<any>()

    
    useEffect(()=>{
        const getMoviesData = async () =>{
            let response = await fetch("/api/movies", { method: "GET" });
            const jsonData = await response.json();
            console.log(jsonData)
            setMovies_data(jsonData.data.results)
        }
        getMoviesData()
    },[])
    const contextValue = {
        movies_data:movies_data,
      
    }
  return (
    <MovieContx.Provider value={contextValue}>
        {props.children}
    </MovieContx.Provider >
  )
}
