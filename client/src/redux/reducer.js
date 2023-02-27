import { GET_ALL_VIDEOGAMES, VIDEOGAMES_SEARCH, PREV_PAGE, NEXT_PAGE, FILTER_BY_GENRE, FILTER_BY_SOURCE, ORDER_ALPHA, ORDER_BY_RATING } from './action-types.js';

const initialState = {
    allVGOriginal: [],
    allVideogames: [],
    allVideogamesCopy: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                allVGOriginal: payload,
                allVideogames: payload,
                allVideogamesCopy: payload,
            };

    
        case VIDEOGAMES_SEARCH:
            return {
                ...state,
                allVideogames: payload,
                allVideogamesCopy: payload,
            };        

        
        case PREV_PAGE:
            return { ...state, allVideogames: state.allVideogamesCopy.slice(payload - 15)
            };


        case NEXT_PAGE:
            return { ...state, allVideogames: state.allVideogamesCopy.slice(payload)}




        case FILTER_BY_GENRE:
            if (payload === 'None') return { ...state, allVideogames: state.allVGOriginal, allVideogamesCopy: state.allVGOriginal };
                        
            const filteredVideogames = state.allVGOriginal.filter((game) => game.genres.find((genre) => genre === payload));        
            return { ...state, allVideogames: filteredVideogames, allVideogamesCopy: filteredVideogames };

        case FILTER_BY_SOURCE:

            if (payload === 'API videogames') {
                state.allVideogames = state.allVGOriginal.filter((game) => game.created === false);
                return {...state, allVideogames: state.allVideogames, allVideogamesCopy: state.allVideogames }
            }        
            if (payload === 'Created videogames') {
                state.allVideogames = state.allVGOriginal.filter((game) => game.created === true)
                return {...state, allVideogames: state.allVideogames, allVideogamesCopy: state.allVideogames }
            }
            return { ...state, allVideogames: state.allVGOriginal, allVideogamesCopy: state.allVGOriginal };
            

        case ORDER_ALPHA:

            if (payload === 'A to Z') {
                const orderedVideogames = state.allVideogamesCopy.sort((a, b) => a.name < b.name ? -1 : 1);
                const allVGOrdered = state.allVGOriginal.sort((a, b) => a.name < b.name ? -1 : 1);
                return { ...state, allVideogames: orderedVideogames, allVideogamesCopy: orderedVideogames, allVGOriginal: allVGOrdered }; 
            };
            if (payload === 'Z to A') {
                state.allVideogames = state.allVideogamesCopy.sort((a, b) => b.name < a.name ? -1 : 1);
                state.allVGOriginal = state.allVGOriginal.sort((a, b) => b.name < a.name ? -1 : 1);
                return { ...state, allVideogames: state.allVideogames, allVideogamesCopy: state.allVideogames, allVGOriginal: state.allVGOriginal };
            };
            
            
        case ORDER_BY_RATING:
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
        
        
        default:
            return { ...state };
    };
};

export default rootReducer;






























// el quilombito tratando de resolver pagination, por las dudas:

// case NEXT_PAGE:
            
        // console.log('allVideogames BEFORE ALL---->', state.allVideogames)  
        // console.log('payload en nextpage---->', payload)    
            // if (payload === 15){
                // state.allVideogames = state.allVideogamesCopy.slice(0, 15);            
                // console.log('allvideogame IF----->', state.allVideogames)   
                
            // } else {
                // let firstIndex = payload === 30 ? 15 : payload - 15;

                // state.allVideogames = state.allVideogamesCopy.slice(payload);    // con esta línea resumí todo lo demás
                // state.allVideogames = state.allVideogamesCopy.slice(firstIndex);
                // firstIndex = firstIndex + 15;
                // console.log('allvideogame ELSE----->', state.allVideogames)           
            // };

        // return {
        //     ...state,            
        //     allVideogames: [ ...state.allVideogames ],
        // };



 // state.allVideogames = state.allVideogamesCopy.slice(payload);



            // if (state.allVideogames.length === state.allVGOriginal.length)

        // if (state.allVideogamesCopy.length < state.allVGOriginal.length) {
        //     if (state.allVideogamesCopy.length <= 30) {
        //         console.log('entro al if en next reducer---->', 'payload--->', payload,  state.allVideogames)
        //         return { ...state, allVideogames: state.allVideogamesCopy.slice(15)}
        //     } else {
        //         let index = 15;
        //         console.log('entro al ELSE en next reducer---->', 'index--->', payload,  state.allVideogames)
        //         state.allVideogames = state.allVideogamesCopy.slice(index);
        //         index = index + 15;
        //         return { ...state, allVideogames: [ ...state.allVideogames ]}

        //     }
        // };


                // if (state.allVideogamesCopy.length < state.allVGOriginal.length) {
        //     console.log('entro al if en prev reducer---->',  state.allVideogames)
        //     return { ...state, allVideogames: state.allVideogamesCopy.slice(payload - 15)}
        // };



// ordenamiento con método localeCompare() dentro la función de comparación del método sort():
// if (payload === 'A to Z') {
//     state.allVideogames = state.allVideogamesCopy.sort((itemA, itemB) => {
//         return itemA.name.localeCompare(itemB.name);
//     });
//     return { ...state, allVideogames: state.allVideogames, allVideogamesCopy: [ ...state.allVideogames ] 
//     }; 
// };