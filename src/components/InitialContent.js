import { useEffect, useState } from "react"
import * as optionsMovie from '../config/optionsMovie.js';
import * as configUrl from '../config/configUrl.js';
import BasicMovie from "./BasicMovie.js";

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

const InitialContent = () => {

    const [movies, setMovies] = useState();
    const [search, setSearch] = useState('');
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
    console.log(movies && movies)
    //--------
    
    function craftUrl(skeletonUrl){
        let searchMovie = listRandomMovies[getRandomNumber(0,13)]
        let url = skeleton+searchMovie+config

        if(search.length >= 2){
            let configuredSearch = removeSpace(search)
            url = skeleton+configuredSearch+config;
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
            <div className="App">
                <h2>🐸FrogFrog🐒</h2>
                <input 
                    name="search" 
                    type="text" 
                    placeholder="Search by full name" 
                    onChange={e => setSearch(e.target.value)}
                    value={search}
                />
                <br/>
                <img src={require("../images/404.png")} alt="" />
            </div>
        )
    }

    return (
        <div className="App">
            <h2>🐸FrogFrog🐸</h2>
            <input 
                name="search" 
                type="text" 
                placeholder="Search by full name" 
                onChange={e => setSearch(e.target.value)}
                value={search}
            />

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
    )
}

export default InitialContent