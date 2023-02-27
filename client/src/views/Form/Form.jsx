import axios from 'axios';
import { useState, useEffect } from 'react';
import validation from './validation.js';

import css from './form.module.css';
import xIco from '../../assets/icons/xIco.png';
import joystickIco from '../../assets/icons/joystickViolet.png';

const Form = () => {
    const [ form, setForm ] = useState({ name: '', image: '', description: '', platforms: [], released: '', rating: 0, genres: [] });
    const [ errors, setErrors ] = useState({});


    useEffect(() => {
        const submitButton = document.querySelector('#submitButton');
            // if (Object.values(form)) {
            // console.log('(Object.values(form)------->', (Object.values(form)));
            const arrayForm = Object.values(form);

            for (let input of arrayForm) {
                if (input === '' || input == [].length) {
                    submitButton.classList.add(css.disabledSubmitButton);
                    submitButton.disabled = true;
                    return;
                } else {
                    submitButton.disabled = false;
                    submitButton.classList.remove(css.disabledSubmitButton);
                };
            };
    }, [form]);

    const submitHandler = async (event) => {
        event.preventDefault();
        // await axios.post(`http://localhost:3001/videogames/test`, form);
        console.log('game created successfully');

        // EVALUAR SI NO HAY NADA EN ERRROR Y SI ESTA TODO OK EN EL FORM
        // EN ESE CASO, SE ENVÍAN LOS DATOS Y SE CREA EL VIDEOGAME
        // (ventana flotante buscale la vuelta)
    };

    const inputChangeHandler = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
        setErrors(validation({ ...form, [name]: value }));
    };




    const inputGendersHandler = (event) => {
        const { value } = event.target;
        if (form.genres.includes(value)) return;
        setForm({ ...form, genres: [ ...form.genres, value ] });
        setErrors(validation({ ...form, genres: [ ...form.genres, value ] }));
    };
    
    const inputPlatformsHandler = (event) => {
        const { value } = event.target;
        if (form.platforms.includes(value)) return;
        setForm({ ...form, platforms: [ ...form.platforms, value ] });
        setErrors(validation({ ...form, platforms: [ ...form.platforms, value ] }));
    };

    const removeGenre = (event) => {
        const { name } = event.target;
        const index = form.genres.indexOf(name);
        form.genres.splice(index, 1)
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


    return(
        <>
        <div className={css.container} >
                <div className={css.contTitle}>                    
                    <h1>Create your <img src={joystickIco} /> <span>videogame!</span></h1>
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
                        <select name='genres' value={form.genres} onChange={inputGendersHandler} multiple >
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
                        {errors.genres && <div className={css.errors} >⚠ {errors.genres}</div>}
                        <div className={css.contArrayGenres} >
                            {form.genres.map((genre, idx) => <span key={idx} >{genre}<img name={genre} onClick={removeGenre} src={xIco}/></span> )}
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
                            {form.platforms.map((platform, idx) => <span key={idx} >{platform}<img name={platform} onClick={removePlatform} src={xIco}/></span> )}
                        </div>
                    </section>

                    <div className={css.contSubmitBtn} >                        
                        <button disabled='' type='submit' id='submitButton' >Create Videogame</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
};

export default Form;




// "PlayStation 5" 
// "Xbox Series S/X"
// "PlayStation 4" 
// "PC" 
// "PlayStation 3"
// "Xbox 360"
// "Xbox One"
// "Nintendo Switch"
// "Linux"
// "macOS"
// "Android"
// "PS Vita"
// "iOS" 
// "Xbox" 
// "Web" 
// "Wii U"
// "Nintendo 3DS"
// "PlayStation 2"
// "Dreamcast"
