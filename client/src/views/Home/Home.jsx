import CardsContainer from '../../components/CardsContainer/CardsContainer.jsx';
import { getAllVideogames } from '../../redux/action-creators.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination/Pagination.jsx';

import css from './home.module.css';

const Home = () => {
    const dispatch = useDispatch();
    const { allVGOriginal } = useSelector((state) => state);

    
    useEffect(() => {
        if (!allVGOriginal.length) dispatch(getAllVideogames());
    }, [dispatch]);

    return(
        <>
            <div className={css.home} >
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