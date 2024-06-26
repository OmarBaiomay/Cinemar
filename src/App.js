import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from './components/MovieCard';


// API Key : 67d2139c

const API_URL = 'https://www.omdbapi.com/?apikey=67d2139c'

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);

    const searchMovies = async (title) =>{
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();
        console.log(data.Search)
        setMovies(data.Search)
    }

    useEffect(()=>{
        searchMovies();
    },[])
  
  return (
    <div className='app'>
        <h1>Cinemar</h1>
        <div className='search'>
            <input 
                placeholder='Search For Movie' 
                value={searchTerm}
                onChange={
                    (e)=>{
                        setSearchTerm(e.target.value)
                    }
                }
            />

            <img 
                src={SearchIcon}
                alt='Search'
                onClick={() => searchMovies(searchTerm)}
            />
        </div>

        {
            movies?.length > 0
            
            ?(
                <div className='container'>
                    {
                        movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))
                    }               
                </div>
            ) : (
                <div className='empty'>
                    <h2>No Movies Found</h2>
                </div>
            )
        }
    </div>
  );
}

export default App;
