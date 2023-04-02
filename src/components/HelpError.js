import '../style/HelpError.scss';

const HelpError = ({errorType}) => {
    return(
        <div className='ErrorBox'>
            <h2>{errorType}</h2>
            <img id="frogError" src={require("../images/frogWithClothes.png")} alt="created by AI DALL-E"/>
            <img id="frogErrorBlur" src={require("../images/frogWithClothes.png")} alt="created by AI DALL-E"/>
            <h3>We use a limited API regarding content search.</h3>
            <ul>
                <li>Search by the exact name of the content, this will make it easier to find.</li>
                <li>Try searching by the full name of what you want to find.</li>
                <li>Remove the spaces after the typed word.</li>
            </ul>
        </div>
    )
}

export default HelpError