'use client'
import React, { createContext, MouseEvent } from 'react'

interface MyContextType {
    selectedSeats: string[];
    showTime : string | null
    handleSeatClick: (e: MouseEvent<SVGElement>, rowName: string, seatNumber: number) => void;
    handleClear : (e:MouseEvent<HTMLButtonElement>) => void;
    handleSetShow : (e:MouseEvent<HTMLButtonElement>,Time:string) => void;
    handleReset : () => void;
}
const defaultContextValue: MyContextType = {
    selectedSeats: [],
    showTime : null,
    handleSeatClick: () => {},
    handleClear: () => {},
    handleSetShow: () => {},
    handleReset:() => {}
};

export const BookingContx = createContext<MyContextType>(defaultContextValue);

type Props = {
    children: React.ReactNode;
};

export default function BookingContext(props:Props) {
    const [selectedSeats, setSelectedSeats] = React.useState<string[]>([]);
    const [showTime, setShowTime] = React.useState<string | null>(null);

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
        handleReset:handleReset
    }

    return (
        <BookingContx.Provider value={contextValue}>
            {props.children}
        </BookingContx.Provider>
    )
}
