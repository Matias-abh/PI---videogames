import { useEffect } from 'react';

import { Link } from 'react-router-dom';

import css from './landing.module.css';
import videoBg from '../../assets/bgLights.mp4';
import logoJoystick from '../../assets/icons/joystickViolet.png';

const Landing = () => {


    // useEffect(() => {
    //     // const body = document.querySelector('body');
    //     // body.classList.add(css.disableScroll);
    //     // return () => body.classList.remove(css.disableScroll);       
    // }, []);



    return(
        <>  
            <div className={`${css.landing}`} id='landing' >
                <div className={css.contWelcome} >
                    <span>Welcome to </span><h1>Video-Games </h1>
                </div>
                <div className={css.contBtnHome} >
                    <Link to='/home' className={css.btnHome} >
                            <span className={css.spanBtn1} ></span>
                            <span className={css.spanBtn2} ></span>
                            <span className={css.spanBtn3} ></span>
                            <span className={css.spanBtn4} ></span>
                            Enter home
                    </Link>
                </div>
                <div className={css.contLogoJoystick} >
                    <Link to='/home'><img src={logoJoystick} /></Link>
                </div>
                <div className={css.overlay} ></div>
                <video className={css.videoBg} src={videoBg} type='video/mp4' autoPlay loop muted />
            </div>
        </>
    )
};

export default Landing;