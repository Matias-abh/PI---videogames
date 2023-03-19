import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getAllVideogames } from '../../redux/action-creators';

import css from './landing.module.css';
import videoBg from '../../assets/bgLights.mp4';
import logoJoystick from '../../assets/icons/logoJoystickCircle.png';

const Landing = () => {
    const dispatch = useDispatch();
    const videogamesSlice = useSelector((state) => state.allVGOriginal).slice(0, 20);
    const videogameImages = videogamesSlice.map((videogame, idx) => <img src={videogame.image} key={idx} /> );
    const [ mounted, setMounted ] = useState(true);
    
    useEffect(() => {
        const loader = document.querySelector('#loader');
        loader.classList.remove('visibilityLoader');
        dispatch(getAllVideogames());
    }, []);


    useEffect(() => {
        const loader = document.querySelector('#loader');
        if (videogameImages.length) {
            setTimeout(() => {
                loader.classList.add('visibilityLoader');
            }, 150)
        };
    }, [videogameImages]);


    const unmountLanding = () => {
        const landing = document.querySelector('#landing');
        landing.classList.add(css.unmountLanding);
        setTimeout(() => {
            setMounted(false);
        }, 500);
    };

    return mounted ? (
        <>  
            <div className={`${css.landing}`} id='landing' >
                <div className={css.overlayImages} ></div>
                <div className={css.contVideogamesImages} >{videogameImages}</div>
                <div className={css.contWelcome} >
                    <span>Welcome to </span><h1>Video-Games </h1>
                </div>
                <div className={css.contBtnHome} >
                    <div className={css.btnHome} onClick={unmountLanding} >
                            <span className={css.spanBtn1} ></span>
                            <span className={css.spanBtn2} ></span>
                            <span className={css.spanBtn3} ></span>
                            <span className={css.spanBtn4} ></span>
                            See all videogames ➥
                    </div>
                </div>
                <div className={css.contLogoJoystick} >
                    <Link to='/home'><img src={logoJoystick} /></Link>
                </div>
                <div className={css.overlay} ></div>
                <video className={css.videoBg} src={videoBg} type='video/mp4' autoPlay loop muted />
            </div>

        </>
    ) : <Redirect to='/home' />;
};

export default Landing;