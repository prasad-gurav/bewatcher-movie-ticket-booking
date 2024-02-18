'use client'
import { MdLocalMovies } from "react-icons/md";
import Link from 'next/link'

function Navbar() {
  return (
    <div className="w-full p-2 flex items-center font-visbylight text-2xl fixed">
        <Link href={'/'}> <MdLocalMovies size={48} /></Link>
        <h2>BeWatcher</h2>
    </div>
  )
}

export default Navbar