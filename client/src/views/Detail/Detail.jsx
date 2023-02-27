import axios from 'axios';
import { useEffect, useState } from 'react';
import css from './detail.module.css';
import goBackIco from '../../assets/icons/goBack.png';
import { Link } from 'react-router-dom';

const Detail = ({ match }) => {
    const [ gameDetail, setGameDetail ] = useState({});
    const gameId = match.params.gameId;
    
    useEffect(()=> {
        axios.get(`http://localhost:3001/videogames/test/${gameId}`)
            .then(res => res.data)
            .then(data => setGameDetail(data));
            window.scrollTo(null, 0)
    }, []);


    // window.onscroll = () => {
    //     console.log('scroooly---->', window.scrollY);
    // };


    // PREGUNTAR POR LO DEL DESTRUCTURING DE UN SPLIT----
    // const fn = () => {
    //     const releasedArray = gameDetail?.released?.split('T');
    //     const [ first, sec ] = releasedArray;
    //         // console.log('released--->', releasedArray);
    //     // console.log('resuuult---->', first);
    // }
    
    return(
        <>
            <div className={css.detail} >
                <div className={css.contImg} >          
                    <img src={gameDetail.image} className={css.gameImg} />
                    <div className={css.contBackBtn} >
                        <Link to='/home'><button><img src={goBackIco} />Back</button></Link>
                    </div>
                    <div className={css.contName} >                    
                        <h1>{gameDetail.name}</h1>                    
                    </div>
                    
                    <div className={css.contRatingrReleased} >                        
                        <h3 className={css.rating} >Rating {gameDetail.rating}</h3>
                        <h3 className={css.released} >Release date {gameDetail.released?.split('T')[0]}</h3>
                    </div>
                    <div className={css.contGenres} >                        
                        <h2>{gameDetail?.genres?.join(', ')}</h2>
                    </div>
                    <div className={css.contDescription} >                        
                        <p>Sequel to the 4-player cooperative FPS RPG Borderlands, where the new team of Vault Hunters arrives on the infamous planet Pandora in order to get the riches, hidden inside the Vault, and help to free the planet from the Handsome Jack, President of Hyperion. Clear out the endless waves and groups and marauders with various weapon types and character abilities.\r\nUnlike the first game, Borderlands 2 provided DLC not only expanding the world of Pandora with stand-alone story campaigns but adding 2 more characters. Now the main cast consists of Gunzerker Salvador(dual-wields guns at command), Siren Maya (holds and paralyzes the enemy), Commando Axton (summons turrets) and Zer0 the Assasin (invisible sniper ninja). But with the DLC players can try out summoning giant flying robots with Gaige the Mechromancer and Krieg the Psycho. \r\nMost of the game charm and popularity of Borderlands 2 comes from the supporting cast and the personalities of the NPC, making this fast-paced shooter with optional cover stand out.</p>
                    </div>
                    <div className={css.contPlatforms} >                        
                        <h3>Platforms: {gameDetail?.platforms?.join(', ')}</h3>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Detail;