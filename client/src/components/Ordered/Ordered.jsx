import { Link } from 'react-router-dom';
import { orderAlpha, orderByRating, setCurrentPage, resetOrder } from "../../redux/action-creators";
import { useDispatch } from 'react-redux';
import css from './ordered.module.css';
import joystickIco from '../../assets/icons/joystickViolet.png';
import arrowDown from '../../assets/icons/arrowDown.png';
import arrowMenu from '../../assets/icons/arrowViolet.png';
import resetImg from '../../assets/icons/reset.png';

const Ordered = () => {
    const dispatch = useDispatch();
    
    const dropDownHandler = () => {
        const arrowMenuBtn = document.querySelector('#arrowMenuBtn');
        const orderedMenu =  document.querySelector('#orderedMenu');
        orderedMenu?.classList.toggle(css.activeOrderedMenu);
        arrowMenuBtn?.classList.toggle(css.activeArrowMenu);
    };    

    const alplhaBtnHandler = () => {
        const ulAlpha = document.querySelector('#ulAlpha');
        const arrowAlpha = document.querySelector('#arrowAlpha');
        ulAlpha.classList.toggle(css.extendedUl);
        arrowAlpha.classList.toggle(css.closeUl);        
    };

    const ratingBtnHandler = () => {
        const ulRating = document.querySelector('#ulRating');
        const arrowRating = document.querySelector('#arrowRating');
        ulRating.classList.toggle(css.extendedUl);
        arrowRating.classList.toggle(css.closeUl);
    };

    const orderHandler = (event) => {
        const order = event.target.textContent;
        dispatch(setCurrentPage(1));
        if (order === 'A to Z' || order === 'Z to A') return dispatch(orderAlpha(order));
        else return dispatch(orderByRating(order));
    };

    const resetOrderHandler = () => {
        dispatch(resetOrder());
        dispatch(setCurrentPage(1));
        const resetImg = document.querySelector('#resetImg');
        resetImg.classList.toggle(css.spinImg);
        dropDownHandler();        
    };


    return (
        <>  
            <div className={css.contArrowMenu} >                            
                <img src={arrowMenu} className={css.arrowMenu} id='arrowMenuBtn' onClick={dropDownHandler} alt='arrow-menu' />
            </div>

            <div className={css.ordered} id='orderedMenu' >

                <div className={css.contTitle} >
                    <img src={joystickIco} className={css.logoImg} alt='logo' />
                    <Link to='/home' className={css.title} ><h1>Video-Games</h1></Link>
                </div>

                <div className={css.contOrderAlpha} >
                    <div className={`${css.contOrAlphaBtn}`} id='alphaBtn' onClick={alplhaBtnHandler} >                        
                        <h3>Order alphabetically</h3><img src={arrowDown} className={css.arrowAlpha} id='arrowAlpha' alt='arrow-down' /> 
                    </div>
                    <ul className={`${css.ulOrderAlpha} ulOrder`} id='ulAlpha' onClick={dropDownHandler} >
                        <li onClick={orderHandler} >A to Z</li>
                        <li onClick={orderHandler} >Z to A</li>
                    </ul>
                </div>

                <div className={css.contOrderRating} >
                    <div className={`${css.contOrRatingBtn}`} id='ratingBtn' onClick={ratingBtnHandler} >           
                        <h3>Order by rating</h3><img src={arrowDown} className={css.arrowRating} id='arrowRating' alt='arrow-down' /> 
                    </div>
                    <ul className={`${css.ulOrderRating} ulOrder`} id='ulRating' onClick={dropDownHandler} >
                        <li onClick={orderHandler} >Highest rating</li>
                        <li onClick={orderHandler} >Lowest rating</li>
                    </ul>
                </div>

                <div className={`${css.resetOrderBtn}`} onClick={resetOrderHandler} >
                    <h3>Reset order</h3><img src={resetImg} className={css.resetImg} id='resetImg' alt='arrow-reset' />
                </div>

            </div>
        </>
    )
};

export default Ordered;