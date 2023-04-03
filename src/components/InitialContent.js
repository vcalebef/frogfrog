import '../style/InitialContent.scss';
import { useEffect, useState } from "react";
import * as optionsMovie from '../config/optionsMovie.js';
import * as configUrl from '../config/configUrl.js';
import BasicMovie from "./BasicMovie.js";
import HelpError from './HelpError';

const date = new Date().toLocaleTimeString();
const options = optionsMovie.options;
const skeleton = configUrl.url.skeleton;
const config = configUrl.url.config;
let url = '';


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
  
function removeSpace(nameMovie) {
    return nameMovie.replace(" ","%20");
}

function getDate(date){
    if(date > 0 && date < 12){
        return("Good morning")
    }else if(date > 12 && date < 18){
        return("Good afternoon")
    }else{
        return("Good night")
    }
}

const InitialContent = () => {

    const [movies, setMovies] = useState();
    const [search, setSearch] = useState('');
    let suggestions = true;
    let SomeMovies = ", some movies and series suggestions for you 😎"
    let listRandomMovies = 
    ['Justice',
    'Avengers', 
    'furious',
    'Harry%20Potter',
    'Scream',
    'High%20School%20Musical',
    'Amazing',
    'World',
    'Happy',
    'Black',
    'war',
    'speed',
    'The%20last'];

    //teste                      
    //console.log("renderizou")
    console.log(url)
    console.log(movies && movies)
    console.log(search.length)
    console.log(date)
    //--------
    
    function craftUrl(skeletonUrl){
        let searchMovie = listRandomMovies[getRandomNumber(0,13)]
        let url = skeleton+searchMovie+config

        if(search.length >= 3){
            let configuredSearch = removeSpace(search)
            url = skeleton+configuredSearch+config;
            suggestions = false;
        }

        return url;
    }

    url = craftUrl()
 
    useEffect(() => {    
        fetch(url, options)
        .then(response => response.json())
        .then(data => setMovies(data))
        .catch(err => console.error(err));
    }, [search])

    if (movies && movies.Response === 'False') {
        return (
            <div>
                <div className="Header">
                    <h2>🐔FrogFrog🐔</h2>
                    <input 
                        name="search" 
                        type="text" 
                        placeholder="🔍 Please search by full name" 
                        onChange={e => setSearch(e.target.value)}
                        value={search}
                        autoFocus
                    />
                </div>
                <HelpError errorType={movies.Error}/>
            </div>
            
        )
    }

    return (
        <div>
            <div className="Header">           
                <h2>🐸FrogFrog🐸</h2>
                <input 
                    name="search" 
                    type="text" 
                    placeholder="🔍 Please search by full name"
                    
                    onChange={e => setSearch(e.target.value)}
                    value={search}
                    autoFocus
                />
            </div>
                <h3>{(suggestions && getDate()+SomeMovies)}</h3>
                <h3>{(!suggestions && "Search result for ")}</h3>
                <h2>{(!suggestions && "''"+search+"''")}</h2>
            <div>
                {    
                    (movies && movies.Response === 'True' && movies.Search.Poster !== 'N/A' && movies.Search.map(item => {
                        //if (item.Poster !== 'N/A'){
                        return (
                            <li key={item.imdbID}>
                            <BasicMovie aboutMovie={item}/>
                            </li>      
                        )
                        // }else{
                        // return(
                        //     null
                        // )
                        // }
                    }))
                }       
            </div>
        </div>
        
    )
}

export default InitialContent