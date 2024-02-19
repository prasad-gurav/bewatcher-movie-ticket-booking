'use client'
import React, { createContext, MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { movies_data } from '@/sample/data'

interface MyContextType {
    selectedSeats: string[];
    bookedSeats: string[];
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
    bookedSeats:[],
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
    const [bookedSeats, setBookedSeats] = React.useState<string[]>([]);

    React.useEffect(()=>{
        const getReservedSeats = async ()=>{
            let data = {
                Show:showTime,
                MovieId:movies_data[Number(movieId)].original_title,
                Date:showDate
            }
            let response = await axios.post('/api/booking/booked',data)
            if(Array.isArray(response.data.data)){
                setBookedSeats(response.data.data)
            }
        }
        getReservedSeats()
    },[showTime])

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
        bookedSeats:bookedSeats,
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
