import React from 'react'
import { Circles } from 'react-loader-spinner';

export default function Spinner() {
    return (
        <Circles
            height="30"
            width="fit"
            color="white"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    )
}
