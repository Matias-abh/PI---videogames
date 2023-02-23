import axios from 'axios';
import { useEffect, useState } from 'react';
import css from './detail.module.css';

const Detail = ({ match }) => {
    const [ gameDetail, setGameDetail ] = useState({});
    const gameId = match.params.gameId;
    
    useEffect(()=> {
        axios.get(`http://localhost:3001/videogames/test/${gameId}`)
            .then(res => res.data)
            .then(data => setGameDetail(data));
    }, []);

    return(
        <>
            <div className={css.detail} >
                <h1>{gameDetail.name}</h1>
                <img src={gameDetail.image} />
                <h3>{gameDetail?.platforms?.join(', ')}</h3>
                <p>Sequel to the 4-player cooperative FPS RPG Borderlands, where the new team of Vault Hunters arrives on the infamous planet Pandora in order to get the riches, hidden inside the Vault, and help to free the planet from the Handsome Jack, President of Hyperion. Clear out the endless waves and groups and marauders with various weapon types and character abilities.\r\nUnlike the first game, Borderlands 2 provided DLC not only expanding the world of Pandora with stand-alone story campaigns but adding 2 more characters. Now the main cast consists of Gunzerker Salvador(dual-wields guns at command), Siren Maya (holds and paralyzes the enemy), Commando Axton (summons turrets) and Zer0 the Assasin (invisible sniper ninja). But with the DLC players can try out summoning giant flying robots with Gaige the Mechromancer and Krieg the Psycho. \r\nMost of the game charm and popularity of Borderlands 2 comes from the supporting cast and the personalities of the NPC, making this fast-paced shooter with optional cover stand out.</p>
                <h4>Release date: {gameDetail.released}</h4>
                <h3>{gameDetail.rating}</h3> 
                <h1>{gameDetail?.genres?.join(', ')}</h1>

            </div>
        </>
    )
};

export default Detail;