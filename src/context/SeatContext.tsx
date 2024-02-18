'use client'
import React, { createContext, MouseEvent } from 'react'

interface MyContextType {
    selectedSeats: string[];
    handleSeatClick: (e: MouseEvent<SVGElement>, rowName: string, seatNumber: number) => void;
    handleClear : (e:MouseEvent<HTMLButtonElement>) => void;
}
const defaultContextValue: MyContextType = {
    selectedSeats: [],
    handleSeatClick: () => {},
    handleClear: () => {}
};

export const SeatsContx = createContext<MyContextType>(defaultContextValue);

type Props = {
    children: React.ReactNode;
};

export default function SeatContext(props:Props) {
    const [selectedSeats, setSelectedSeats] = React.useState<string[]>([]);
    
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
    
    const contextValue: MyContextType = {
        selectedSeats: selectedSeats,
        handleSeatClick: handleSeatClick,
        handleClear:handleClear
    }

    return (
        <SeatsContx.Provider value={contextValue}>
            {props.children}
        </SeatsContx.Provider>
    )
}
