import CardsContainer from '../../components/CardsContainer/CardsContainer.jsx';
import Ordered from '../../components/Ordered/Ordered.jsx';
import { getAllVideogames } from '../../redux/action-creators.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Pagination from '../../components/Pagination/Pagination.jsx';

import css from './home.module.css';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllVideogames());
    }, [dispatch]);


    return(
        <>
            <div className={css.home} >                
                <div className={css.orderedComp} >
                    <Ordered />
                </div>
                <div className={css.paginationComp} >
                    <Pagination />                    
                </div>
                <div className={css.cardsComp} >
                    <CardsContainer />                    
                </div>
            </div>
        </>
    )
};

export default Home;