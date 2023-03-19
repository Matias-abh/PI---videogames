import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { setCurrentPage, resetHome, filterBySource } from '../../redux/action-creators.js';
import css from './navBar.module.css';
import joystickIco from '../../assets/icons/joystickViolet.png';


const NavBar = () => {

    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const { allVGOriginal, allVideogamesCopy } = useSelector((state) => state);
  

    const gamesSourceHandler = (event) => {
        const source = event.target.textContent;
        dispatch(filterBySource(source));     
        dispatch(setCurrentPage(1));
    };
    
    
    const resetHomeHandler = () => {
        // if (allVideogamesCopy.length < allVGOriginal.length ) return;        
        dispatch(resetHome());
        dispatch(setCurrentPage(1));
    };

    return (
        <>  
            <div className={css.navBar}>
                <div className={css.contNav} >          
                    <div className={css.contTitle} >
                        <img src={joystickIco} className={css.logoImg} />     
                        <Link to='/home' className={css.title} onClick={resetHomeHandler} ><h1>Video-Games</h1></Link>
                    </div>

                    <div className={css.contLinks} >
                        <Link className={`${css.link} ${css.linkHome}`} to='/home' >Home</Link>

                        <div className={css.contMenuOrigin} >                            
                            <Link className={`${css.link} ${css.linkVgOrigin}`} to='/home' >Videogame origin</Link>
                                <ul className={css.subMenu} id='ulOrigin' >
                                    <li onClick={gamesSourceHandler} >All videogames</li>
                                    <li onClick={gamesSourceHandler} >API videogames</li>
                                    <li onClick={gamesSourceHandler} >Created videogames</li>
                                </ul>             
                        </div>

                        <Link className={`${css.link} ${css.linkCreateGame}`} to='/create' >Create videogame</Link>
                        <Link className={`${css.link} ${css.linkContact}`} to='/contact' >Contact</Link>              
                    </div>
                    
                </div>

                {
                    pathname === '/home' &&                
                    <div className={css.contSearchBar} >
                        <SearchBar></SearchBar>                
                    </div>
                }
            </div>
        </>
    )
};

export default NavBar;