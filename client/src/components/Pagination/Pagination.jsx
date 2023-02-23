import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage } from "../../redux/action-creators";
import Filtered from "../Filtered/Filtered";

import css from './pagination.module.css';
import pagesBtn from '../../assets/icons/pagesBtn.png';

const Pagination = () => {
    const dispatch = useDispatch();
    const { allVideogamesCopy } = useSelector((state) => state);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ firstIndexOfPage, setFirstIndexOfPage ] = useState(15);
    const gamesPerPage = 15;
    const totalPages = Math.ceil(allVideogamesCopy.length / gamesPerPage);
    const totalPagesArr = [];
    for (let i = 0; i < totalPages; i++) totalPagesArr.push(i + 1);


    useEffect(() => {
        const btnPrev = document.querySelector('#prevBtn');
        const btnNext = document.querySelector('#nextBtn');
        btnPrev.disabled = currentPage === 1 ? true : false;
        btnNext.disabled = totalPages && currentPage === totalPages ? true : false;
    
        currentPage === 1 ? btnPrev.classList.add(css.disableBtns) : btnPrev.classList.remove(css.disableBtns)
        currentPage === (totalPagesArr.length) ? btnNext.classList.add(css.disableBtns) : btnNext.classList.remove(css.disableBtns)

    }, [currentPage, allVideogamesCopy]);

    useEffect(()=> {
        setCurrentPage(1)
    }, [allVideogamesCopy]);


    const nextPageHandler = () => {
        setCurrentPage(currentPage + 1);
        setFirstIndexOfPage(firstIndexOfPage + gamesPerPage);
        dispatch(nextPage(firstIndexOfPage));        
    };
    
    const prevPageHandler = () => {
        setCurrentPage(currentPage - 1);
        setFirstIndexOfPage(firstIndexOfPage - gamesPerPage);
        dispatch(prevPage(gamesPerPage * (currentPage-1)));
    };

    const numPagesHandler = (event) => {
        const numPage = event.target.name;
        setCurrentPage(parseInt(numPage));
        if (numPage === currentPage) return;
        if (numPage < currentPage) return dispatch(prevPage(numPage * gamesPerPage));
        if (numPage > currentPage) return dispatch(nextPage((numPage - 1) * gamesPerPage));
    };

   const arrayPages = totalPagesArr?.map((page, idx) => <a className={`${currentPage === page ? css.currentNumPage : false}`} name={page} onClick={numPagesHandler} key={idx} >{page}</a>)



    const resetCurrentPage = () => {
        setCurrentPage(1);
        setFirstIndexOfPage(15);
    };


    return (
        <>
            <div className={css.pagination} >
                
                <div className={css.filteredComp} >
                    <Filtered resetCurrentPage={resetCurrentPage} ></Filtered>
                </div>

                <div className={css.contNumPages} >             
                    <button disabled='' className={`${css.btnPrev} ${css.pagesBtns}`} onClick={prevPageHandler} id='prevBtn' ><img src={pagesBtn} className={css.imgPrevBtn} /></button>

                    <div className={css.contArrayPages} >{arrayPages}</div>

                    <button disabled='' className={`${css.btnNext} ${css.pagesBtns}`} onClick={nextPageHandler} id='nextBtn' ><img src={pagesBtn} className={css.imgNextBtn} /></button>
                </div>


            </div>
            
        </>
    )
};

export default Pagination;