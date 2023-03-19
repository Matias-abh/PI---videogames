import { Link } from 'react-router-dom';
import css from './card.module.css';


const Card = ({ id, name, image, genres, Genres, rating, created }) => {

    const genresCreated = Genres?.map((genre) => genre.name);
    

    return (
        <>
            <Link className={css.linkCard} to={`/detail/${id}`} >
                <div className={css.card} >
                    <div className={css.name} ><h2>{name}</h2></div>

                    <div className={css.contImg} >                    
                        <img src={image} />
                    </div>
                    
                    <div className={css.contRating} >
                        <h3>Rating: {rating}</h3>
                    </div>

                    <div className={css.contGenres} >
                        {   created ? <h3>{genresCreated?.join(', ')}</h3> : <h3>{genres?.join(', ')}</h3>  }
                    </div>

                </div>
            </Link>
        </>
    )
};

export default Card;