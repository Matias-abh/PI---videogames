import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { orderAlpha, orderByRating } from "../../redux/action-creators";

import css from './ordered.module.css';
import arrowDown from '../../assets/icons/arrowDown.png';
import arrowMenu from '../../assets/icons/arrowViolet.png';
import { useDispatch } from 'react-redux';

const Ordered = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const arrowMenu = document.querySelector('#arrowMenu');
        const orderedMenu = document.querySelector('#orderedMenu');
        const ulOrderList = document.querySelectorAll('.ulOrder');

        const alphaBtn = document.querySelector('#alphaBtn');
        const ulAlpha = document.querySelector('#ulAlpha')
        const ratingBtn = document.querySelector('#ratingBtn');
        const ulRating = document.querySelector('#ulRating')
        const arrowAlpha = document.querySelector('#arrowAlpha')
        const arrowRating = document.querySelector('#arrowRating')
        
        arrowMenu.addEventListener('click', () => {
            orderedMenu.classList.toggle(css.activeOrderedMenu);
            arrowMenu.classList.toggle(css.activeArrowMenu);
        });
        
        ulOrderList.forEach((ulOrder) => {
            ulOrder.addEventListener('click', () => {                
                orderedMenu.classList.toggle(css.activeOrderedMenu);
                arrowMenu.classList.toggle(css.activeArrowMenu);
            });
        });

        alphaBtn.addEventListener('click', () => {
            ulAlpha.classList.toggle(css.extendedUl);
            arrowAlpha.classList.toggle(css.closeUl);
        });
        
        ratingBtn.addEventListener('click', () => {
            ulRating.classList.toggle(css.extendedUl);
            arrowRating.classList.toggle(css.closeUl);
        });


    }, []);


    const orderHandler = (event) => {
        const order = event.target.textContent;
        if (order === 'A to Z' || order === 'Z to A') return dispatch(orderAlpha(order));
        else return dispatch(orderByRating(order));
    };


    return (
        <>  
            <div className={css.contArrowMenu} >                            
                <img src={arrowMenu} id='arrowMenu' />
            </div>

            <div className={css.ordered} id='orderedMenu' >

                    <div className={css.contTitle} >
                        <Link to='/home' className={css.title} ><h1>Micchi-Games</h1></Link>
                    </div>

                <div className={css.contOrderAlpha} >
                    <div className={`${css.contOrAlphaBtn}`} id='alphaBtn' >                        
                        <h3>Order alphabetically</h3><img src={arrowDown} className={css.arrowAlpha} id='arrowAlpha' /> 
                    </div>
                    <ul className={`${css.ulOrderAlpha} ulOrder`} id='ulAlpha' >
                        <li onClick={orderHandler} >A to Z</li>
                        <li onClick={orderHandler} >Z to A</li>
                    </ul>
                </div>

                <div className={css.contOrderRating} >
                    <div className={`${css.contOrRatingBtn}`} id='ratingBtn' >           
                        <h3>Order by rating</h3><img src={arrowDown} className={css.arrowRating} id='arrowRating' /> 
                    </div>
                    <ul className={`${css.ulOrderRating} ulOrder`} id='ulRating' >
                        <li onClick={orderHandler} >Highest rating</li>
                        <li onClick={orderHandler} >Lowest rating</li>
                    </ul>
                </div>

            </div>
        </>
    )
};

export default Ordered;