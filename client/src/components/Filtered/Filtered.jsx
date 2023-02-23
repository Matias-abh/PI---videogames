import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByGenre } from "../../redux/action-creators";
import css from './filtered.module.css';

const Filtered = ({ resetCurrentPage }) => {
    const dispatch = useDispatch();
    const [ filterOption, setFilterOption ] = useState('');
    const { allVideogamesCopy, allVGOriginal } = useSelector((state) => state);

    const filterHandler = (event) => {
        const option = event.target.textContent;
        dispatch(filterByGenre(option));
        resetCurrentPage();
        option === 'None' ? setFilterOption('') : setFilterOption(option);
    };



    useEffect(() => {
        const filterBtn = document.querySelector('#filterBtn');
        const ul = document.querySelector('#ulFilter');

        filterBtn.addEventListener('click', () => {
            ul.classList.toggle(css.activeFilterOpcions);            
        });

        ul.addEventListener('click', () => {
            ul.classList.toggle(css.activeFilterOpcions);
        });
    }, []);
    

    useEffect(() => {
    allVideogamesCopy.length < allVGOriginal.length ? setFilterOption(filterOption) : setFilterOption('');
    }, [allVideogamesCopy]);
    

    return (
        <>
            <div className={css.filtered} >

                <div className={css.contFilterOptions} >
                    <div className={css.contFilterBtn} id='filterBtn' >                        
                        <h2>Filter by : <span>{filterOption}</span></h2>
                    </div>
                    <ul className={css.ulFilter} id='ulFilter' >
                        <li onClick={filterHandler} id='liFilter' >None</li>
                        <li onClick={filterHandler} id='liFilter' >Action</li>
                        <li onClick={filterHandler} id='liFilter' >Indie</li>
                        <li onClick={filterHandler} id='liFilter' >Adventure</li>
                        <li onClick={filterHandler} id='liFilter' >RPG</li>
                        <li onClick={filterHandler} id='liFilter' >Strategy</li>
                        <li onClick={filterHandler} id='liFilter' >Shooter</li>
                        <li onClick={filterHandler} id='liFilter' >Casual</li>
                        <li onClick={filterHandler} id='liFilter' >Simulation</li>
                        <li onClick={filterHandler} id='liFilter' >Puzzle</li>
                        <li onClick={filterHandler} id='liFilter' >Arcade</li>
                        <li onClick={filterHandler} id='liFilter' >Platformer</li>
                        <li onClick={filterHandler} id='liFilter' >Racing</li>
                        <li onClick={filterHandler} id='liFilter' >Massively Multiplayer</li>
                        <li onClick={filterHandler} id='liFilter' >Sports</li>
                        <li onClick={filterHandler} id='liFilter' >Fighting</li>
                        <li onClick={filterHandler} id='liFilter' >Family</li>
                        <li onClick={filterHandler} id='liFilter' >Board Games</li>
                        <li onClick={filterHandler} id='liFilter' >Educational</li>
                        <li onClick={filterHandler} id='liFilter' >Card</li>
                    </ul>
                </div>
            </div>
        </>
    )
};

export default Filtered;

/*
"Action"
"Indie"
"Adventure"
"RPG"
"Strategy"
"Shooter"
"Casual"
"Simulation"
"Puzzle"
"Arcade"
"Platformer"
"Racing"
"Massively Multiplayer"
"Sports"
"Fighting"
"Family"
"Board Games"
"Educational"
"Card"
*/

// filter hecho con select y options
                {/* <div>                    
                <h3>Filter videogames by genre: </h3>
                    <select onChange={filterHandler} >
                        <option value='All' >Select genre:</option>
                        <option value='All' >All</option>
                        <option value='Action' >Action</option>
                        <option value='Indie' >Indie</option>
                        <option value='Adventure' >Adventure</option>
                        <option value='RPG' >RPG</option>
                        <option value='Strategy' >Strategy</option>
                        <option value='Shooter' >Shooter</option>
                        <option value='Casual' >Casual</option>
                        <option value='Simulation' >Simulation</option>
                        <option value='Puzzle' >Puzzle</option>
                        <option value='Arcade' >Arcade</option>
                        <option value='Platformer' >Platformer</option>
                        <option value='Racing' >Racing</option>
                        <option value='Massively Multiplayer' >Massively Multiplayer</option>
                        <option value='Sports' >Sports</option>
                        <option value='Fighting' >Fighting</option>
                        <option value='Family' >Family</option>
                        <option value='Board Games' >Board Games</option>
                        <option value='Educational' >Educational</option>
                        <option value='Card' >Card</option>
                    </select>
                </div> */}