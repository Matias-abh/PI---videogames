import axios from 'axios';
import { GET_ALL_VIDEOGAMES, VIDEOGAMES_SEARCH, NEXT_PAGE, PREV_PAGE, FILTER_BY_GENRE, FILTER_BY_SOURCE, ORDER_ALPHA, ORDER_BY_RATING } from './action-types.js';

export const getAllVideogames = () => {
    return async (dispatch) => {
        try {
            const { data } = (await axios.get(`http://localhost:3001/videogames/test`))
            return dispatch({
                type: GET_ALL_VIDEOGAMES,
                payload: data,
            });            
        } catch (error) {
            console.error(error);
        }
    };
};


export const videogamesSearch = (gameName) => {
    return async (dispatch) => {
        try {
            const { data } = (await axios.get(`http://localhost:3001/videogames/test?name=${gameName}`));
            return dispatch({
                type: VIDEOGAMES_SEARCH,
                payload: data,
            });            
        } catch (error) {
            console.error(error);
        };
    };
};

export const nextPage = (firstIndexOfPage) => {
    return { type: NEXT_PAGE, payload: firstIndexOfPage };
};

export const prevPage = (firstIndexOfPage) => {
    return { type: PREV_PAGE, payload: firstIndexOfPage };
};

export const filterByGenre = (option) => {
    return { type: FILTER_BY_GENRE, payload: option };
};

export const filterBySource = (source) => {
    return { type: FILTER_BY_SOURCE, payload: source };
};

export const orderAlpha = (order) => {
    return { type: ORDER_ALPHA, payload: order };
};

export const orderByRating = (order) => {
    return { type: ORDER_BY_RATING, payload: order };
};