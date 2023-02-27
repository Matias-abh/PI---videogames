// import { useEffect, useState } from 'react';
// import axios from 'axios';
import css from './cardsContainer.module.css';
import Card from '../Card/Card.jsx';
import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';


const CardsContainer = () => {

    const { allVideogames } = useSelector((state) => state);
    const videogamesPage = allVideogames.slice(0, 15);
    
    // const allPlatforms = []; 
    // allVideogames.map((game) => {
    //     game.platforms.map((plat) => allPlatforms.push(plat));
    // });
    // const platforms = [ ...new Set(allPlatforms)];
    // console.log('allplatforms----->', platforms);

    return (
        <>
            <div className={css.cardsContainer} >                
                {
                    allVideogames.length 
                    ? videogamesPage?.map((game) => {
                        return (
                            <Card
                                key={game.id}
                                id={game.id}
                                name={game.name}
                                image={game.image}
                                genres={game.genres}                              
                                rating={game.rating}                              
                            />
                        )
                    })
                    : <h2 style={{color: '#fff'}} > no videogame matches </h2>
                }
            </div>
        </>
    )
};

export default CardsContainer;

