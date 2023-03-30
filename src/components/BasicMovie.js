import { useEffect, useState } from "react"
import AdditionalInfo from './AdditionalInfo.js'
import * as optionsMovie from '../config/optionsMovie.js';
import * as configUrl from '../config/configUrl.js';

const options = optionsMovie.options;
const skeleton = configUrl.urlMoreInfo.skeleton;

const BasicMovie = ({aboutMovie}) => {

    const [movies, setMovies] = useState();
    const [active, setActive] = useState(false);
    const [idMovie, setIdMovie] = useState();

    useEffect(() => {
        
        if(active){
            let url = skeleton+idMovie;
        fetch(url, options)
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(err => console.error(err));
        }             

    }, [active,idMovie])

    function lookMoreInfo() {
        setIdMovie(aboutMovie.imdbID)
        setActive(!active)
    }

    return (
        <div onClick={lookMoreInfo}>
            <h1>{aboutMovie.Title} - {aboutMovie.Year}</h1>
            <h2>{aboutMovie.Type}</h2>
            <img src={aboutMovie.Poster} alt={aboutMovie.Title}/>

            <AdditionalInfo active={active} movies={movies}/>
        </div>
    )
}

export default BasicMovie