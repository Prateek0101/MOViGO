import { createSlice } from "@reduxjs/toolkit";


const loadWishlistFromStorage = () => {
    const savedMovies = localStorage.getItem('wishlistMovies');
    const savedTvShows = localStorage.getItem('wishlistTvShows');

    return {
        movies: savedMovies? JSON.parse(savedMovies) : [],
        tvShows: savedTvShows? JSON.parse(savedTvShows) : []
    }
}
const initialState = loadWishlistFromStorage();

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        toggleMovieInWishlist: (state, action) => {
            const movieIndex = state.movies.findIndex(movie=> movie.id === action.payload.id);
            if(movieIndex == -1){
                state.movies.push(action.payload);
                localStorage.setItem("wishlistMovies", JSON.stringify(state.movies));
            } else{
                state.movies.splice(movieIndex, 1);
                localStorage.setItem("wishlistMovies", JSON.stringify(state.movies));
            }
        },
        toggleTvShowInWishlist: (state,action) => {
            const tvIndex = state.tvShows.findIndex(tvShows => tvShows.id ===action.payload.id);
            if(tvIndex == -1){
                state.tvShows.push(action.payload);
                localStorage.setItem("wishlistTvShows", JSON.stringify(state.movies));
            } else{
                state.tvShows.splice(tvIndex, 1);
                localStorage.setItem("wishlistTvShows", JSON.stringify(state.tvShows));
            }
        }
    }

})
export const {
    toggleMovieInWishlist,
    toggleTvShowInWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;