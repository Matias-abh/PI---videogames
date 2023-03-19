import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { videogamesSearch } from '../../redux/action-creators.js';
import css from './searchBar.module.css';
import searchIco from '../../assets/icons/searchIco.png';


const SearchBar = () => {

    const { allVideogames } = useSelector((state) => state);
    const [ search, setSearch ] = useState('');
    const dispatch = useDispatch();


    useEffect(() => {
        const loader = document.querySelector('#loader');
        if (allVideogames.length) loader.classList.add('visibilityLoader');
    }, [allVideogames]);
    
    const searched = (event) => {
        const { value } = event.target;
        setSearch(value);
    };

    const searchHandler = () => {
        const loader = document.querySelector('#loader');
        loader.classList.remove('visibilityLoader');
        dispatch(videogamesSearch(search));
        setSearch('');
    };

    return (
        <>
            <div className={css.searchBar} >     
                <div className={css.spreadInput} >
                    <div className={css.contInput} >
                        <input type='text' name='search' onChange={searched} value={search} placeholder='Search videogame...' />
                    </div>
                    <div className={css.contSearchIco} >
                        <img src={searchIco} onClick={searchHandler} />
                    </div>
                </div>
            </div>
        </>
    )
};

export default SearchBar;