import { useEffect ,useState } from 'react';
import './style/App.scss';
import './components/BasicMovie.js'
import BasicMovie from './components/BasicMovie.js';
import * as optionsMovie from './config/optionsMovie.js';

const options = optionsMovie.options;
let url = '';

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function removeSpace(nameMovie) {
  return nameMovie.replace(" ","%20");
}

function App() {
  const [error, setError] = useState({
    result: false,
    type: ''
  });
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

  function checkError(movies){
    if (error.result === false && movies && movies.Response === 'False') {
      setError(error.result = true, error.type = movies.Error);
      console.log(error)
    }
  }

  function craftUrl(){
    let searchMovie = listRandomMovies[getRandomNumber(0,13)]
    let url = 'https://movie-database-alternative.p.rapidapi.com/?s='+searchMovie+'&r=json&page=1'

    if(search.length > 1){
      let configuredSearch = removeSpace(search)
      url = 'https://movie-database-alternative.p.rapidapi.com/?s='+configuredSearch+'&r=json&page=1';
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

 checkError(movies);

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
      
      {    
        (movies && movies.Response === 'True' && movies.Search.Poster !== 'N/A' && movies.Search.map(item => {
          if (item.Poster !== 'N/A'){
            return (
              <li key={item.imdbID}>
                <BasicMovie aboutMovie={item}/>
              </li>      
            )
          }else{
            return(
              null
            )
          }
        }))
      }

      <h1>{(movies && movies.Response)}</h1>
    </div>
  );
}

export default App;
