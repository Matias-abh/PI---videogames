import css from './pageNotFound.module.css';
import error404 from '../../assets/icons/404.png';


const PageNotFound = () => {


    return (
        <>
            <div className={css.pageNotFound} >
                <div className={css.contErrorImg} >
                    <img src={error404} alt='error404' />
                </div>
                <div className={css.contError404} >
                    <h1>404</h1>
                    <h2>Page not found</h2>
                </div>
            </div>
        </>
    )
};

export default PageNotFound;