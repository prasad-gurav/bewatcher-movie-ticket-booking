'use client'
import React, { createContext, MouseEvent } from 'react'
import { useRouter } from 'next/navigation'

interface MyContextType {
    selectedSeats: string[];
    showTime : string | null;
    movieId : number | null;
    showDate: string | null;
    handleSeatClick: (e: MouseEvent<SVGElement>, rowName: string, seatNumber: number) => void;
    handleClear : (e:MouseEvent<HTMLButtonElement>) => void;
    handleSetShow : (e:MouseEvent<HTMLButtonElement>,Time:string) => void;
    handleReset : () => void;
    handleSetMovie: (e:MouseEvent<HTMLButtonElement>,id:number) => void;
    handleSetShowDate:(e:MouseEvent<HTMLButtonElement>,date:string) => void;
}
const defaultContextValue: MyContextType = {
    selectedSeats: [],
    showTime : null,
    movieId:null,
    showDate : null,
    handleSeatClick: () => {},
    handleClear: () => {},
    handleSetShow: () => {},
    handleReset:() => {},
    handleSetMovie:() => {},
    handleSetShowDate:() => {}
};

export const BookingContx = createContext<MyContextType>(defaultContextValue);

type Props = {
    children: React.ReactNode;
};

export default function BookingContext(props:Props) {
    const router = useRouter()
    const [movieId,setMovieId] = React.useState<number | null>(null)
    const [selectedSeats, setSelectedSeats] = React.useState<string[]>([]);
    const [showTime, setShowTime] = React.useState<string | null>(null);
    const [showDate, setShowDate] = React.useState<string | null>(null)

    const handleSetShowDate = (e:MouseEvent<HTMLButtonElement>,date:string)=>{
        setShowDate(date)
    }
    const handleSetShow = (e: MouseEvent<HTMLButtonElement>, Time: string) => {
        setShowTime(Time)
    }

    const handleSeatClick = (e: MouseEvent<SVGElement>, rowName: String, seatNumber: number) => {
        let Seat: string = rowName + seatNumber.toString()
        setSelectedSeats((prevSelectedSeats) => {
            if (prevSelectedSeats.includes(Seat)) {
                return prevSelectedSeats.filter((selectedSeat) => selectedSeat !== Seat);
            } else {
                return [...prevSelectedSeats, Seat];
            }
        });
    }

    const handleSetMovie = (e:MouseEvent<HTMLButtonElement>,id:number)=>[
        setMovieId(id),
        router.push('/audi')
    ]

    const handleClear = (e:MouseEvent<HTMLButtonElement>) =>{
        setSelectedSeats([])
    }
    const handleReset = () =>{
        setSelectedSeats([])
        setShowTime(null)
    }
    
    const contextValue: MyContextType = {
        selectedSeats: selectedSeats,
        handleSeatClick: handleSeatClick,
        handleClear:handleClear,
        showTime:showTime,
        handleSetShow:handleSetShow,
        handleReset:handleReset,
        movieId:movieId,
        handleSetMovie:handleSetMovie,
        showDate:showDate,
        handleSetShowDate:handleSetShowDate
    }

    return (
        <BookingContx.Provider value={contextValue}>
            {props.children}
        </BookingContx.Provider>
    )
}
