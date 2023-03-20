import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage, setCurrentPage  } from "../../redux/action-creators";
import Filtered from "../Filtered/Filtered";
import Ordered from "../Ordered/Ordered";

import css from './pagination.module.css';
import pagesBtn from '../../assets/icons/pagesBtn.png';
import goUpIco from '../../assets/icons/goUpIco.png';


const Pagination = () => {
    const dispatch = useDispatch();
    const { allVideogamesCopy, currentPage } = useSelector((state) => state);    
    const gamesPerPage = 15;
    const totalPages = Math.ceil(allVideogamesCopy.length / gamesPerPage);
    const totalPagesArr = [];
    for (let i = 0; i < totalPages; i++) totalPagesArr.push(i + 1);


    useEffect(() => {
        const btnPrev = document.querySelector('#prevBtn');
        const btnNext = document.querySelector('#nextBtn');
        if (!allVideogamesCopy.length) {
            btnPrev.disabled = true;
            btnNext.disabled = true;
            btnPrev.classList.add(css.disableBtns);
            btnNext.classList.add(css.disableBtns);
            return;
        };
        btnPrev.disabled = currentPage === 1 ? true : false;
        btnNext.disabled = totalPages && currentPage === totalPages ? true : false;            
        currentPage === 1 ? btnPrev.classList.add(css.disableBtns) : btnPrev.classList.remove(css.disableBtns);
        currentPage === (totalPagesArr.length) ? btnNext.classList.add(css.disableBtns) : btnNext.classList.remove(css.disableBtns);
    }, [currentPage, allVideogamesCopy]);
    
    useEffect(() => {
        const goUpBtn = document.querySelector('#goUpBtn');
        window.onscroll = () => window.scrollY < 300 ? goUpBtn?.classList?.remove(css.activeGoUpBtn) : goUpBtn?.classList?.add(css.activeGoUpBtn);
    }, []);

    const prevPageHandler = () => {
        dispatch(prevPage(gamesPerPage * (currentPage - 1)));
        dispatch(setCurrentPage(currentPage - 1));
    };

    const nextPageHandler = () => {
        dispatch(nextPage(gamesPerPage * currentPage));
        dispatch(setCurrentPage(currentPage + 1));
    };    

    const numPagesHandler = (event) => {
        const numPage = event.target.name;
        dispatch(setCurrentPage(parseInt(numPage)));
        if (numPage === currentPage) return;
        if (numPage < currentPage) {
            dispatch(prevPage(gamesPerPage * numPage));
        }
        else if (numPage > currentPage) {
            dispatch(nextPage(gamesPerPage * (numPage - 1)));
        };
    };

    const goUpHandler = () => {
        window.scrollTo(0, 0);
    };

    const arrayPages = totalPagesArr?.map((page, idx) => <a className={`${currentPage === page ? css.currentNumPage : css.numPages}`} name={page} onClick={numPagesHandler} key={idx} >{page}</a>);

    
    return (
        <>
            <div className={css.orderedComp} >
                <Ordered />
            </div>

            <div className={css.pagination} >

                <div className={css.filteredComp} >
                    <Filtered ></Filtered>
                </div>

                <div className={css.contNumPages} >             
                    <button disabled='' className={`${css.btnPrev} ${css.pagesBtns}`} onClick={prevPageHandler} id='prevBtn' ><img src={pagesBtn} className={css.imgPrevBtn} alt='prev' /></button>
                    <div className={css.contArrayPages} >{arrayPages}</div>
                    <button disabled='' className={`${css.btnNext} ${css.pagesBtns}`} onClick={nextPageHandler} id='nextBtn' ><img src={pagesBtn} className={css.imgNextBtn} alt='next' /></button>
                </div>

                <div className={`${css.contGoUpBtn} `} id='goUpBtn' onClick={goUpHandler} >
                    <div><img src={goUpIco} className={css.goUpBtn} alt='goup' /></div>                
                </div>

            </div>
            
        </>
    )
};

export default Pagination;