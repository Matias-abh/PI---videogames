import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import validation from './validation.js';
import { Link } from 'react-router-dom';

import css from './form.module.css';
import xIco from '../../assets/icons/xIco.png';
import joystickIco from '../../assets/icons/joystickViolet.png';
import xError from '../../assets/icons/xError.png';

const Form = () => {
    const [ form, setForm ] = useState({ name: '', image: '', description: '', platforms: [], released: '', rating: 0, genres: [] });
    const [ errors, setErrors ] = useState({});
    const [ genres, setGenres ] = useState([]);
    const [ genreNames, setGenreNames ] = useState([]);
    const [ backSuccessResponse, setSuccessBackResponse ] = useState('');
    const [ backErrorResponse, setBackErrorResponse ] = useState('');
    const [ idCreatedGame, setIdCreatedGame ] = useState('');
    const { allVGOriginal } = useSelector((state) => state);


    const getAllGenres = async () => {
        const { data } = (await axios.get(`http://localhost:3001/genres`));
        setGenres(data);
    };

    useEffect(() => {
        getAllGenres();
    }, []);

    useEffect(() => {
        const submitButton = document.querySelector('#submitButton');
        const arrayForm = Object.values(form);        

        for (let input of arrayForm) {
            if (input === '' || input == [].length || Object.keys(errors).length > 0) {
                submitButton.disabled = true;
                submitButton.classList.add(css.disabledSubmitButton);
                return;
            } else {
                submitButton.disabled = false;
                submitButton.classList.remove(css.disabledSubmitButton);
            };
        };
    }, [form]);

    
    const submitHandler = async (event) => {
        event.preventDefault();

        const response = allVGOriginal?.find((videogame) => videogame.name.toLowerCase().includes(form.name.toLowerCase()));

        if (!response) {
            try {
                const response = await axios.post(`http://localhost:3001/videogames/`, form);
                if (response.status !== 200) throw new Error(response);               
                else {
                    setIdCreatedGame(response.data.id)
                    setSuccessBackResponse(`The videogame "${response.data.name}", has been created successfully!`);
                }
            } catch (error) {
                setBackErrorResponse(error.response.data.error);
            };       
        } else {
            setBackErrorResponse('Error: the game you are trying to create already exists');
        };


        const modalSubmit = document.querySelector('#modalSubmit');
        modalSubmit.classList.add(css.modalDisplay);
        modalSubmit.showModal();
        setForm({ name: '', image: '', description: '', platforms: [], released: '', rating: 0, genres: [] });
    };


    const inputChangeHandler = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
        setErrors(validation({ ...form, [name]: value }));
    };

    const inputGenresHandler = (event) => {
        const { value } = event.target;
        if (form.genres.includes(value)) return;
        setForm({ ...form, genres: [ ...form.genres, value ] });
        setErrors(validation({ ...form, genres: [ ...form.genres, value ] }));
        const genreName = event.target.options[event.target.selectedIndex].text;
        setGenreNames([ ...genreNames, genreName ])
    };
    
    const inputPlatformsHandler = (event) => {
        const { value } = event.target;
        if (form.platforms.includes(value)) return;
        setForm({ ...form, platforms: [ ...form.platforms, value ] });
        setErrors(validation({ ...form, platforms: [ ...form.platforms, value ] }));
    };

    const removeGenre = (event) => {
        const { name } = event.target;
        const indexGenreNames = genreNames.indexOf(name);        
        genreNames.splice(indexGenreNames, 1);
        
        const selectedGenre = genres.find((genre) => genre.name === name);        
        const indexGenreForm = form.genres.indexOf((selectedGenre.id).toString());        
        form.genres.splice(indexGenreForm, 1);       
        setForm({ ...form, });
        setErrors(validation({ ...form }));
    };    


    const removePlatform = (event) => {
        const { name } = event.target;
        const index = form.platforms.indexOf(name);
        form.platforms.splice(index, 1)
        setForm({ ...form });
        setErrors(validation({ ...form }));
    };

    const reload = () => {
        window.location.pathname = '/home';
    };


    return(
        <>
        <div className={css.container} >
                <div className={css.contTitle}>                    
                    <h1>Create your <img src={joystickIco} alt='joystick' /> <span>videogame!</span></h1>
                    <p>Create an entry for your videogame to become part of the great list of <span>videogames</span> on our site.</p>
                </div>
            <div className={css.form} >
                <form onSubmit={submitHandler} >
                    <section className={css.contName} >                        
                        <label htmlFor='name' >Name: </label>
                        <input type='' name='name' value={form.name} onChange={inputChangeHandler} placeholder='Name of your videogame...' ></input>
                        {errors.name && <div className={css.errors} >⚠ {errors.name}</div>}
                    </section>

                    <section className={css.contImage} >
                        <label htmlFor='image' >Image (url): </label>
                        <input type='url' name='image' value={form.image} onChange={inputChangeHandler} placeholder='http://example-imageurl/...' ></input>
                        {errors.image && <div className={css.errors} >⚠ {errors.image}</div>}
                    </section>

                    <section className={css.contDescription} >
                        <label htmlFor='description' >Description: </label>
                        <textarea name='description' value={form.description} onChange={inputChangeHandler} placeholder='Comment a description about your game...' ></textarea>
                        {errors.description && <div className={css.errors} >⚠ {errors.description}</div>}
                    </section>
                           
                    <section className={css.contReleased} >
                        <label htmlFor='released' >Release date: </label>
                        <input type='date' name='released' value={form.released} onChange={inputChangeHandler} ></input>
                        {errors.released && <div className={css.errors} >⚠ {errors.released}</div>}
                    </section>

                    <section className={css.contRating} >                        
                        <label htmlFor='rating' ><span>Rating: {form.rating == 0 ? <span>(default value 0)</span> : <span>{form.rating}</span> } </span></label>                    
                        <input type='range' name='rating' value={form.rating} onChange={inputChangeHandler} min='0' max='5' step='0.01' ></input>                                            
                    </section>
                    
                    <section className={css.contGenres} >
                    <label htmlFor='genres' >Genres: </label>
                    <select name='genres' value={form.genres} onChange={inputGenresHandler} multiple >
                        {
                            genres?.map((genre, idx) => <option value={genre.id}  key={idx}>{genre.name}</option>)
                        }
                    </select>
                        {errors.genres && <div className={css.errors} >⚠ {errors.genres}</div>}
                        <div className={css.contArrayGenres} >
                            {genreNames.map((genre, idx) => <span key={idx} >{genre}<img name={genre} onClick={removeGenre} src={xIco} alt='x' /></span> )}
                        </div>
                    </section>

                    <section className={css.contPlatforms} >
                        <label htmlFor='platforms' >Platforms: </label>
                        <select name='platforms'  value={form.platforms} onChange={inputPlatformsHandler} multiple >
                            <option value='PlayStation 5' >PlayStation 5</option>
                            <option value='Xbox Series S/X' >Xbox Series S/X</option>
                            <option value='PlayStation 4' >PlayStation 4</option>
                            <option value='PC' >PC</option>
                            <option value='PlayStation 3' >PlayStation 3</option>
                            <option value='Xbox 360' >Xbox 360</option>
                            <option value='Xbox One' >Xbox One</option>
                            <option value='Nintendo Switch' >Nintendo Switch</option>
                            <option value='Linux' >Linux</option>
                            <option value='macOS' >macOS</option>
                            <option value='Android' >Android</option>
                            <option value='PS Vita' >PS Vita</option>
                            <option value='iOS' >iOS</option>
                            <option value='Xbox' >Xbox</option>
                            <option value='Web' >Web</option>
                            <option value='Wii U' >Wii U</option>
                            <option value='Nintendo 3DS' >Nintendo 3DS</option>
                            <option value='PlayStation 2' >PlayStation 2</option>
                            <option value='Dreamcast' >Dreamcast</option>
                        </select>
                            {errors.platforms && <div className={css.errors} >⚠ {errors.platforms}</div>}
                        <div className={css.contArrayPlatforms} >
                            {form.platforms.map((platform, idx) => <span key={idx} >{platform}<img name={platform} onClick={removePlatform} src={xIco} alt='x' /></span> )}
                        </div>
                    </section>

                    <div className={css.contSubmitBtn} >                        
                        <button disabled='' type='submit' id='submitButton' >Create Videogame</button>
                    </div>
                </form>
            </div>
        </div>

        <dialog id='modalSubmit' className={css.modalSubmit} >
            {(backSuccessResponse && <img src={joystickIco} alt='joystick' />) || (backErrorResponse && <img src={xError} alt='error' />) }
            {(backSuccessResponse && <h1>Great!</h1>) || (backErrorResponse && <h1>Something went wrong!</h1>) }
            {(backSuccessResponse && <h2>{backSuccessResponse}</h2>) || (backErrorResponse && <h2>{backErrorResponse}</h2>) }
            {idCreatedGame && <div><Link to={`/detail/${idCreatedGame}`} className={css.goToSeeItLink} ><h2 className={css.goToSeeIt} >Go to see it!</h2></Link> <span className={css.or} >or</span></div>}
            <span onClick={reload} className={css.linkToHomeModal} ><div className={css.btnHomeModal} >Back to Home</div></span>
        </dialog>
        </>
    )
};

export default Form;