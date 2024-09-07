'use client'
import { MdLocalMovies } from "react-icons/md";
import Link from 'next/link'
import { useEffect, useState } from "react";
import { motion } from 'framer-motion'

function Navbar() {
  const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

  return (
    <motion.div
    className={`w-full p-2 flex items-center font-visbylight text-2xl fixed `}
    initial={{ height: 120 }}
    animate={{ height: scrollY > 80 ? 60 : 120,backgroundColor: scrollY > 80 ? "rgba(40, 36, 36, 0.66)" : "rgba(40, 36, 36, 0)"
    }}
    transition={{ type: "spring", stiffness: 100, damping: 20 }}
  >
    <Link href={'/'}> <MdLocalMovies size={48} /></Link>
    <h2>BeWatcher</h2>
    <h2 className="text-4xl py-4 px-10 font-manrope">Now Playing</h2>
  </motion.div>
  )
}

export default Navbar