import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'

export default function ShowTimes(props: any) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showtimes, setShowtimes] = useState(['12:00 PM', '15:00 PM', '18:00 PM', '21:00 PM']);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Update current time every minute

        return () => clearInterval(intervalId);
    }, []);

    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentFormattedTime = `${currentHour < 10 ? '0' + currentHour : currentHour}:${currentMinute < 10 ? '0' + currentMinute : currentMinute} ${currentHour < 12 ? 'AM' : 'PM'}`;
    console.log(currentFormattedTime)

    return (
        <div className='absolute top-[20%] left-[50%] w-[60%] md:w-[28%] translate-x-[-50%] z-10 bg-slate-900 p-4 rounded-md'>
            <h2 className='my-4 font-poppins'>Select Show Time</h2>
            <motion.div className='flex flex-wrap justify-center gap-2' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3.5 }}>
                {showtimes.map((show) => {
                    return (
                        <div key={show} onClick={(e) => { Number(currentHour) < Number(show.split(":")[0]) ? props.handler(e, show) : console.log(show) }} className={`${Number(currentHour) >= Number(show.split(":")[0]) ? "text-gray-500" : "cursor-pointer text-blue-500 "} border-2   border-blue-500 px-2`}>
                            {show}
                        </div>
                    )
                })}
            </motion.div>
        </div>
    )
}
