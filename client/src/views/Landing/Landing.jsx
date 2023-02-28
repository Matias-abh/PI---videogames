import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllVideogames } from '../../redux/action-creators';

import css from './landing.module.css';
import videoBg from '../../assets/bgLights.mp4';
// import logoJoystick from '../../assets/icons/joystickViolet.png';
import logoJoystick from '../../assets/icons/logoJoystickCircle.png';

const Landing = () => {
    const dispatch = useDispatch();
    const { allVGOriginal } = useSelector((state) => state);
    const allVideogameImages = allVGOriginal.map((videogame, idx) => <img src={videogame.image} key={idx} /> );
    const videogameImages = allVideogameImages.slice(0, 20)
    // console.log('array de iamges--->', videogamesImages)


    useEffect(() => {
        dispatch(getAllVideogames());
    }, []);



    // useEffect(() => {
    //     // const body = document.querySelector('body');
    //     // body.classList.add(css.disableScroll);
    //     // return () => body.classList.remove(css.disableScroll);       
    // }, []);



    return(
        <>  
            <div className={`${css.landing}`} id='landing' >
                <div className={css.overlayImages} ></div>
                <div className={css.contVideogamesImages} >{videogameImages}</div>
                <div className={css.contWelcome} >
                    <span>Welcome to </span><h1>Video-Games </h1>
                </div>
                <div className={css.contBtnHome} >
                    <Link to='/home' className={css.btnHome} >
                            <span className={css.spanBtn1} ></span>
                            <span className={css.spanBtn2} ></span>
                            <span className={css.spanBtn3} ></span>
                            <span className={css.spanBtn4} ></span>
                            See all videogames ➥
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