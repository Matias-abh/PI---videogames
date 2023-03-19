import axios from 'axios';
import { GET_ALL_VIDEOGAMES, VIDEOGAMES_SEARCH, NEXT_PAGE, PREV_PAGE, SET_CURRENT_PAGE, RESET_HOME, FILTER_BY_GENRE, FILTER_BY_SOURCE, ORDER_ALPHA, ORDER_BY_RATING, ERROR_REQUEST, RESET_ORDER } from './action-types.js';



export const getAllVideogames = () => {
    return async (dispatch) => {
        try {
            const { data } = (await axios.get(`http://localhost:3001/videogames/`));
            return dispatch({ type: GET_ALL_VIDEOGAMES, payload: data });            
        } catch (error) {
            return dispatch({ type: ERROR_REQUEST, payload: error.response.data.error });
        };
    };
};

export const videogamesSearch = (gameName) => {
    return async (dispatch) => {
        try {
            const { data } = (await axios.get(`http://localhost:3001/videogames/?name=${gameName}`));
            return dispatch({ type: VIDEOGAMES_SEARCH, payload: data });            
        } catch (error) {
            return dispatch({ type: ERROR_REQUEST, payload: error.response.data.error });
        };
    };
};

export const nextPage = (firstIndexOfPage) => {
    return { type: NEXT_PAGE, payload: firstIndexOfPage };
};

export const prevPage = (firstIndexOfPage) => {
    return { type: PREV_PAGE, payload: firstIndexOfPage };
};

export const setCurrentPage = (currentPage) => {
    return { type: SET_CURRENT_PAGE, payload: currentPage };
};

export const resetHome = () => {
    return { type: RESET_HOME };
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

export const setError = (error) => {
    return { type: ERROR_REQUEST, payload: error };
};

export const resetOrder = () => {
    return { type: RESET_ORDER };
};