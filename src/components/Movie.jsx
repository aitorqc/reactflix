import React, { useContext, useState, useEffect } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { AuthContext } from '../context/AuthContextProvider'
import { db } from '../firebase'
import { arrayUnion, doc, updateDoc, onSnapshot } from 'firebase/firestore'

export default function Movie({ item }) {
    const [movies, setMovies] = useState([]);

    const { user } = useContext(AuthContext);

    const movieId = doc(db, 'users', `${user?.email}`);

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setMovies(doc.data()?.savedShows);
        });
    }, [user?.email]);

    const saveShow = async () => {
        if (user?.email) {
            await updateDoc(movieId, {
                savedShows: arrayUnion({
                    id: item.id,
                    title: item.title,
                    img: item.backdrop_path
                })
            })
        } else {

        }
    }

    return (
        <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
            <img src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} alt={item.title} className='w-full h-auto block' />
            <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>{item.title}</p>
                {user?.email &&
                    <p onClick={saveShow}>{movies?.find((movie) => movie.id === item.id) ? <FaHeart className='absolute top-4 left-4 text-gray-300' size={20} /> : <FaRegHeart className='absolute top-4 left-4 text-gray-300' size={20} />}</p>
                }
            </div>
        </div>
    )
}
