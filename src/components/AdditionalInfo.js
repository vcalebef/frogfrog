const AdditionalInfo = ({active,movies}) => {
    return (
        <div>
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

export default AdditionalInfo;