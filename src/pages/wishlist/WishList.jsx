import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "../../components/movieCard/MovieCard";

const WishlistPage = () => {
    const { movies, tvShows } = useSelector((state) => state.wishlist);

    return (
        <div className="wishlistContainer">
            <h2>My Wishlist</h2>
            <div className="wishlistItems">
                {movies.length > 0 && <h3>Movies</h3>}
                <div className="wishlistGrid">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} data={movie} mediaType="movie" />
                    ))}
                </div>
                {tvShows.length > 0 && <h3>TV Shows</h3>}
                <div className="wishlistGrid">
                    {tvShows.map((tvShow) => (
                        <MovieCard key={tvShow.id} data={tvShow} mediaType="tv" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WishlistPage;
