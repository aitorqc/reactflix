import React, { useContext, useState, useEffect } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'
import { AuthContext } from '../context/AuthContextProvider';
import { db } from '../firebase';
import { onSnapshot, doc, updateDoc } from 'firebase/firestore'

export default function SavedShows() {
    const [movies, setMovies] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setMovies(doc.data()?.savedShows);
        });
    }, [user?.email]);

    const movieRef = doc(db, 'users', `${user?.email}`);

    const deleteShow = async (passedId) => {
        try {
            const result = movies.filter((item) => item.id !== passedId);
            await updateDoc(movieRef, {
                savedShows: result
            })
        } catch (error) {

        }
    }

    const slideLeft = () => {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    const slideRight = () => {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    return (
        <>
            <h2 className='text-white font-bold md:text-xl p-4'>My Shows</h2>
            {
                movies.length === 0 ?
                    <div className='w-full h-full text-center'>
                        <p className='text-white text-5xl'>Empty</p>
                    </div> :

                    <div className="relative flex items-center group">
                        <MdChevronLeft
                            className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block ml-3'
                            size={40}
                            onClick={slideLeft} />
                        <div id={"slider"} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">

                            {movies?.map((item) => (
                                <div key={item.id} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
                                    <img src={`https://image.tmdb.org/t/p/original/${item.img}`} alt={item.title} className='w-full h-auto block' />
                                    <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                                        <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>{item.title}</p>
                                        <p className='absolute text-gray-300 top-4 right-4' onClick={() => deleteShow(item.id)}><AiOutlineClose size={20} /></p>
                                    </div>
                                </div>
                            ))}

                        </div>
                        <MdChevronRight className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block mr-3'
                            size={40}
                            onClick={slideRight} />
                    </div>
            }
        </>
    )
}
