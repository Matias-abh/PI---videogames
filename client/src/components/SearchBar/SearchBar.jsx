import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { videogamesSearch } from '../../redux/action-creators.js';

import css from './searchBar.module.css';
import searchIco from '../../assets/icons/searchIco.png';

const SearchBar = () => {
    const [ search, setSearch ] = useState('');
    const dispatch = useDispatch();
    // const [ searchResults, setSearchResults ] = useState([]);

    const searched = (event) => {
        const { value } = event.target;
        setSearch(value);
        // dispatch(videogamesSearch(value));       // con este dispatch haría una búsqueda en tiempo real (se actualizaría por cada letra que ingrese por input)
    };

    const searchHandler = () => {
        dispatch(videogamesSearch(search));
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

