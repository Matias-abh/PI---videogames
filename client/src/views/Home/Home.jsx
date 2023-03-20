import CardsContainer from '../../components/CardsContainer/CardsContainer.jsx';
import { getAllVideogames, setError } from '../../redux/action-creators.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Pagination from '../../components/Pagination/Pagination.jsx';
import { Link } from 'react-router-dom';

import css from './home.module.css';
import xErrorB from '../../assets/icons/xErrorBlack.png';
import closeIco from '../../assets/icons/closeIco.png';

const Home = () => {
    const dispatch = useDispatch();
    const { allVGOriginal, allVideogames, errorRequest } = useSelector((state) => state);
    
    
    useEffect(() => {
        const loader = document.querySelector('#loader');
        loader.classList.remove('visibilityLoader');       
        if (!allVGOriginal.length) dispatch(getAllVideogames());        
    }, [dispatch]);
    
    useEffect(() => {
        const loader = document.querySelector('#loader');
        if (allVideogames.length) {
            loader.classList.add('visibilityLoader');
        };
    }, [allVideogames]);
    
    useEffect(() => {
        const modalError = document.querySelector('#modalError');
        if (errorRequest) {
            modalError.classList.add(css.modalDisplay);
            modalError.showModal();
        };
    }, [errorRequest]);
    
    const closeModal = () => {
        const loader = document.querySelector('#loader');
        const modalError = document.querySelector('#modalError');
        modalError.classList.remove(css.modalDisplay);
        modalError.close();
        dispatch(setError(''));
        loader.classList.add('visibilityLoader');
    };
    

    return(
        <>
            <dialog id='modalError' className={css.modalError} >
                <img src={closeIco} onClick={closeModal} className={css.imgCloseIco} alt='close' />
                <img src={xErrorB} className={css.imgError} alt='error' />
                <h1>{errorRequest}</h1>
                <Link to='/home' ><div className={css.btnCloseModal} onClick={closeModal} >Back to Home</div></Link>     
            </dialog>

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