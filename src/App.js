import { useEffect ,useState } from 'react';
import './style/App.scss';
import './components/BasicMovie.js'
import BasicMovie from './components/BasicMovie.js';
import * as optionsMovie from './config/optionsMovie.js';

const options = optionsMovie.options;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function App() {
  const [movies, setMovies] = useState();
  const [search, setSearch] = useState('');

  //teste                      
  //console.log("renderizou")
  //console.log(movies && movies)
  //--------
 
  useEffect(() => {    

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

  let searchMovie = listRandomMovies[getRandomNumber(0,13)]

  let url = 'https://movie-database-alternative.p.rapidapi.com/?s='+searchMovie+'&r=json&page=1'

  if(search.length > 1){
    url = 'https://movie-database-alternative.p.rapidapi.com/?s='+search+'&r=json&page=1';
  }
    fetch(url, options)
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(err => console.error(err));

    //console.log(movies)
  }, [search])

  return (
    <div className="App">
      <h2>🐸FrogFrog🐸</h2>

      <input 
        name="search" 
        type="text" 
        placeholder="Buscar filme (em inglês please)" 
        onChange={e => setSearch(e.target.value)}
        value={search}
      />
      
      {movies && movies.Response === 'True' && movies.Search.Poster !== 'N/A' && movies.Search.map(item => {
        if (item.Poster !== 'N/A'){
          return (
            <ul key={item.imdbID}>
              <BasicMovie aboutMovie={item}/>
            </ul>
          )
        }else{
          return(
            null
          )
        }
      })}
    </div>
  );
}

export default App;
