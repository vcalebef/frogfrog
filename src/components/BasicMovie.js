import { useEffect, useState } from "react"
import * as optionsMovie from '../config/optionsMovie.js';

const options = optionsMovie.options;

const BasicMovie = ({aboutMovie}) => {

    const [movies, setMovies] = useState();
    const [active, setActive] = useState(false);
    const [idMovie, setIdMovie] = useState();
    //console.log("antes ",active)

    useEffect(() => {
        
        if(active){
           //console.log("entrou")
            let url = 'https://movie-database-alternative.p.rapidapi.com/?r=json&i='+idMovie;
            //console.log(url)
        fetch(url, options)
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(err => console.error(err));
        }             

    }, [active,idMovie])

   

    function lookMoreInfo() {
        //console.log("aqui = ",aboutMovie.imdbID)
        setIdMovie(aboutMovie.imdbID)
        setActive(!active)
    }

    return (
        <div onClick={lookMoreInfo}>
            <h1>{aboutMovie.Title} - {aboutMovie.Year}</h1>
            <h2>{aboutMovie.Type}</h2>
            <img src={aboutMovie.Poster} alt={aboutMovie.Title}/>
            {/*<img hidden={!active} id="info" src={aboutMovie.Poster} alt={aboutMovie.Title} />*/}

            <h4>{(active && movies && movies.Actors)}</h4>
            <h4>{(active && movies && movies.Awards)}</h4>
            <h4>{(active && movies && movies.BoxOffice)}</h4>
            <h4>{(active && movies && movies.Country)}</h4>
            <h4>{(active && movies && movies.Director)}</h4>
            <h4>{(active && movies && movies.Gnere)}</h4>
            <h4>{(active && movies && movies.Language)}</h4>
            <h4>{(active && movies && movies.Metascore)}</h4>
            <h4>{(active && movies && movies.Plot)}</h4>
            <h4>{(active && movies && movies.Rated)}</h4>
            <h4>{(active && movies && movies.Released)}</h4>
            <h4>{(active && movies && movies.Runtime)}</h4>
            <h4>{(active && movies && movies.imdbRating)}</h4>
            <h4>{(active && movies && movies.imdbVotes)}</h4>

            {(active && movies && movies.Ratings.map((item, index) => {
                return(
                    <ul key={index}>
                        <li>{item.Source}</li>    
                        <li>{item.Value}</li>
                        <br></br>
                    </ul>
                )
            }))}
        </div>
    )
}

export default BasicMovie