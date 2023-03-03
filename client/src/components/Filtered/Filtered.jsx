import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByGenre, setCurrentPage } from "../../redux/action-creators";
import css from './filtered.module.css';


const Filtered = () => {
    const dispatch = useDispatch();
    const [ filterOption, setFilterOption ] = useState(window.sessionStorage.getItem('filterOption'));
    const { allVideogamesCopy, allVGOriginal } = useSelector((state) => state);


    useEffect(() => {
        allVideogamesCopy.length < allVGOriginal.length ? setFilterOption(filterOption) : setFilterOption('');
    }, [allVideogamesCopy]);
    
    useEffect(() => {
        window.sessionStorage.setItem('filterOption', filterOption);
    }, [filterOption]);

    const filterHandler = (event) => {
        const option = event.target.textContent;
        dispatch(filterByGenre(option));
        option === 'None' ? setFilterOption('') : setFilterOption(option);
        dispatch(setCurrentPage(1));
    };

    const filterBtnHandler = () => {
        const ul = document.querySelector('#ulFilter');
        ul.classList.toggle(css.activeUlFilter);
    };


    return (
        <>
            <div className={css.filtered} >
                <div className={css.contFilterOptions} >

                    <div className={css.contFilterBtn} id='filterBtn' onClick={filterBtnHandler} >                        
                        <h2>Filter by : <span>{filterOption || <span className={css.selectGenreDefault} >   select genre...</span> }</span></h2>
                    </div>

                    <ul className={css.ulFilter} id='ulFilter' onClick={filterBtnHandler} >
                        <li onClick={filterHandler} >None</li>
                        <li onClick={filterHandler} >Action</li>
                        <li onClick={filterHandler} >Indie</li>
                        <li onClick={filterHandler} >Adventure</li>
                        <li onClick={filterHandler} >RPG</li>
                        <li onClick={filterHandler} >Strategy</li>
                        <li onClick={filterHandler} >Shooter</li>
                        <li onClick={filterHandler} >Casual</li>
                        <li onClick={filterHandler} >Simulation</li>
                        <li onClick={filterHandler} >Puzzle</li>
                        <li onClick={filterHandler} >Arcade</li>
                        <li onClick={filterHandler} >Platformer</li>
                        <li onClick={filterHandler} >Racing</li>
                        <li onClick={filterHandler} >Massively Multiplayer</li>
                        <li onClick={filterHandler} >Sports</li>
                        <li onClick={filterHandler} >Fighting</li>
                        <li onClick={filterHandler} >Family</li>
                        <li onClick={filterHandler} >Board Games</li>
                        <li onClick={filterHandler} >Educational</li>
                        <li onClick={filterHandler} >Card</li>
                    </ul>
                </div>
            </div>
        </>
    )
};

export default Filtered;