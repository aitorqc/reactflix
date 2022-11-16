import axios from 'axios';
import React, { useEffect, useState } from 'react'

import requests from '../Request';

export default function Main() {
    const [movies, setMovies] = useState([]);

    const  winSize = window.innerWidth;
    const movie = movies[Math.floor(Math.random() * movies.length)]

    useEffect(() => {
        axios.get(requests.requestPopular).then((response) => {
            setMovies(response.data.results);
        });
    }, [])

    const truncateString = (str) => {
        if(winSize < 480){
            return str?.slice(0, 150) + " ...";
        }else if(winSize >= 480 && winSize < 680){
            return str?.slice(0, 200) + " ...";
        }else if(winSize >= 680 && winSize < 1024){
            return str?.slice(0, 400) + " ...";
        }else{
            return str;
        }
    }

    return (
        <div className='w-full lg:h-[650px] h-[550px] text-white'>
            <div className="w-full h-full">
                <div className="absolute w-full lg:h-[650px] h-[550px] bg-gradient-to-r from-black"></div>
                <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
            </div>
            <div className='absolute w-full top-[20%] p-4 md:p-8'>
                <h1 className='text-3xl md:text-5xl font-bold'>{movie?.title}</h1>
                <div className='my-4'>
                    <button className='border bg-gray-300 text-black border-gray-300 py-2 px-5'>Play</button>
                    <button className='border text-white border-gray-300 py-2 px-5 ml-4'>Watch Later</button>
                </div>
                <p className='text-gray-400 text-sm'>Released: {movie?.release_date}</p>
                <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>
                    {truncateString(movie?.overview)}
                </p>
            </div>
        </div>
    )
}
