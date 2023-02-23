import { Link } from 'react-router-dom';
import css from './landing.module.css';

const Landing = () => {

    return(
        <>  <div className={css.landing}>            
                <h1>Landing</h1>
                <div className={css.contBtn}>                    
                    <Link to='/home'><button className={css.btn} >Home</button></Link>
                </div>
        </div>
        </>
    )
};

export default Landing;