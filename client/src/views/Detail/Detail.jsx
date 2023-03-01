import axios from 'axios';
import { useEffect, useState } from 'react';
import css from './detail.module.css';
import goBackIco from '../../assets/icons/goBack.png';
import { Link } from 'react-router-dom';

const Detail = ({ match }) => {
    const [ gameDetail, setGameDetail ] = useState({});
    const gameId = match.params.gameId;
    
    useEffect(()=> {
        axios.get(`http://localhost:3001/videogames/${gameId}`)
            .then(res => res.data)
            .then(data => setGameDetail(data));
            window.scrollTo(null, 0)
    }, []);

    const genres = gameDetail?.Genres?.map((genre) => genre.name);


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
                        { gameDetail.created 
                        ? <h2>{genres?.join(', ')}</h2>
                        : <h2>{gameDetail?.genres?.join(', ')}</h2>
                        }
                    </div>
                    <div className={css.contDescription} >
                        <p>{gameDetail?.description?.replaceAll('<p>', '').replaceAll('</p>', '')}</p>                  
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