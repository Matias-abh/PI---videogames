import css from './cardsContainer.module.css';
import Card from '../Card/Card.jsx';
import { useSelector } from 'react-redux';


const CardsContainer = () => {
    
    const { allVideogames } = useSelector((state) => state);
    const videogamesPage = allVideogames.slice(0, 15);


    return (
        <>
            <div className={css.cardsContainer} >                
                {
                    videogamesPage?.map((game) => {
                        return (
                            <Card
                                key={game.id}
                                id={game.id}
                                name={game.name}
                                image={game.image}
                                genres={game.genres}                              
                                Genres={game.Genres}                              
                                rating={game.rating}
                                created={game.created}
                            />
                        )
                    })
                }
            </div>
        </>
    )
};

export default CardsContainer;

