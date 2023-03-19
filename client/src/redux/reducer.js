import { GET_ALL_VIDEOGAMES, VIDEOGAMES_SEARCH, PREV_PAGE, NEXT_PAGE, SET_CURRENT_PAGE, RESET_HOME, FILTER_BY_GENRE, FILTER_BY_SOURCE, ORDER_ALPHA, ORDER_BY_RATING, ERROR_REQUEST, RESET_ORDER } from './action-types.js';


const initialState = {
    allVGOriginal: [],
    allVideogames: [],
    leakedGamesBySource: [],
    allVideogamesCopy: [],
    currentPage: 1,
    errorRequest: '',
    auxAllVgOriginal: [],
};


const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                allVGOriginal: payload,
                allVideogames: [ ...payload ],
                allVideogamesCopy: [ ...payload ],
                leakedGamesBySource: [ ...payload ],
            };

    
        case VIDEOGAMES_SEARCH:
            return {
                ...state,
                allVideogames: payload,
                allVideogamesCopy: payload,
            };

        
        case PREV_PAGE:
            return { ...state, allVideogames: state.allVideogamesCopy.slice(payload - 15)};
            

        case NEXT_PAGE:
            return { ...state, allVideogames: state.allVideogamesCopy.slice(payload)};

            
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: payload };

        
        case RESET_HOME:
            return { ...state, allVideogames: state.allVGOriginal, allVideogamesCopy: state.allVGOriginal, leakedGamesBySource: state.allVGOriginal };


        case FILTER_BY_GENRE:

            if (payload === 'None') return { ...state, allVideogames: state.allVGOriginal, allVideogamesCopy: state.allVGOriginal, leakedGamesBySource: state.allVGOriginal };                        
                        
            const filteredVGCreated = state.allVGOriginal.filter((game) => {
                if (game.created) return game.Genres.find((genre) => genre.name === payload);
            });
            const filteredVGAPI = state.allVGOriginal.filter((game) => {
                if (!game.created) return game.genres.find((genre) => genre === payload);                   
            });

            const created = state.leakedGamesBySource.filter((game) => game.created === true);
            const API = state.leakedGamesBySource.filter((game) => game.created === false);
            const allVideogamesFiltered = [ ...filteredVGAPI, ...filteredVGCreated ];

            if (created.length && API.length) return { ...state, allVideogames: allVideogamesFiltered, allVideogamesCopy: allVideogamesFiltered };
            if (created.length) return { ...state, allVideogames: filteredVGCreated, allVideogamesCopy: filteredVGCreated };
            if (API.length) return { ...state, allVideogames: filteredVGAPI, allVideogamesCopy: filteredVGAPI };


        case FILTER_BY_SOURCE:

            if (payload === 'API videogames') {
                const filteredVGAPI = state.allVGOriginal.filter((game) => game.created === false);
                return {...state, allVideogames: filteredVGAPI, allVideogamesCopy: filteredVGAPI, leakedGamesBySource: filteredVGAPI };
            };
            if (payload === 'Created videogames') {
                const filteredVGCreated = state.allVGOriginal.filter((game) => game.created === true)
                return {...state, allVideogames: filteredVGCreated, allVideogamesCopy: filteredVGCreated, leakedGamesBySource: filteredVGCreated };
            };

            return { ...state, allVideogames: state.allVGOriginal, allVideogamesCopy: state.allVGOriginal, leakedGamesBySource: state.allVGOriginal };

            case ORDER_ALPHA:

            if (!state.auxAllVgOriginal.length) {
                state.auxAllVgOriginal = [ ...state.allVGOriginal ];
            };          
            if (payload === 'A to Z') {
                const orderedVideogames = state.allVideogamesCopy.sort((a, b) => a.name < b.name ? -1 : 1);
                const allVGOrdered = state.allVGOriginal.sort((a, b) => a.name < b.name ? -1 : 1);
                return { ...state, allVideogames: orderedVideogames, allVideogamesCopy: orderedVideogames, allVGOriginal: allVGOrdered }; 
            };
            if (payload === 'Z to A') {
                const orderedVideogames = state.allVideogamesCopy.sort((a, b) => b.name < a.name ? -1 : 1);
                const allVGOrdered = state.allVGOriginal.sort((a, b) => b.name < a.name ? -1 : 1);
                return { ...state, allVideogames: orderedVideogames, allVideogamesCopy: orderedVideogames, allVGOriginal: allVGOrdered };
            };                        
                
            
        case ORDER_BY_RATING:
            
            if (!state.auxAllVgOriginal.length) state.auxAllVgOriginal = [ ...state.allVGOriginal ];
            
            if (payload === 'Lowest rating') {
                const orderedVideogames = state.allVideogamesCopy.sort((a, b) => a.rating - b.rating);
                const allVGOrdered = state.allVGOriginal.sort((a, b) => a.rating - b.rating);
                return { ...state, allVideogames: orderedVideogames, allVideogamesCopy: orderedVideogames, allVGOriginal: allVGOrdered };
            };
            if (payload === 'Highest rating') {
                const orderedVideogames = state.allVideogamesCopy.sort((a, b) => b.rating - a.rating);
                const allVGOrdered = state.allVGOriginal.sort((a, b) => b.rating - a.rating);
                return { ...state, allVideogames: orderedVideogames, allVideogamesCopy: orderedVideogames, allVGOriginal: allVGOrdered };
            };
               
            
        case ERROR_REQUEST: 
            return { ...state, errorRequest: payload };
            
            case RESET_ORDER:
            if (!state.auxAllVgOriginal.length) return { ...state };
            else return { ...state, allVideogames: state.auxAllVgOriginal, allVideogamesCopy: state.auxAllVgOriginal, allVGOriginal: [ ...state.auxAllVgOriginal], leakedGamesBySource: state.auxAllVgOriginal };

        default:
            return { ...state };
    };
};

export default rootReducer;