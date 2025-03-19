import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";
import { toggleMovieInWishlist, toggleTvShowInWishlist } from "../../store/slices/wishlistSlice";
import { FaHeart } from "react-icons/fa";

const MovieCard = ({ data, fromSearch, mediaType}) => {
    const { url } = useSelector((state) => state.home);
    const wishlistMovies = useSelector((state) => state.wishlist.movies);
    const wishlistTvShows = useSelector((state) => state.wishlist.tvShows);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;
    
    const isMovie = mediaType === 'movie' || data.mediaType === 'movie';
    const isTvShow = mediaType === 'tv' || data.mediaType === 'tv'; 

    const isWishlisted = isMovie
        ? wishlistMovies.some((movie) => movie.id === data.id)
        : wishlistTvShows.some((tvShow) => tvShow.id === data.id);

    const handelWishlistToggle = (e) => {
        e.stopPropagation();
        if(isMovie){
            dispatch(toggleMovieInWishlist(data));
        } else if(isTvShow){
            dispatch(toggleTvShowInWishlist(data));
        }
        
    }
    return (
        <div
            className="movieCard"
            onClick={() =>
                navigate(`/${data.media_type || mediaType}/${data.id}`)
            }
        >
            <h4>{data.title}</h4>
            <div className="posterBlock">
                <Img className="posterImg" src={posterUrl} />
                {!fromSearch && (
                    <React.Fragment>
                        <CircleRating rating={data.vote_average.toFixed(1)} />
                        <Genres data={data.genre_ids.slice(0, 2)} />
                    </React.Fragment>
                )}
                <FaHeart className={`heartIcon ${isWishlisted ? "❤️" : "🤍"}`}
                onClick={handelWishlistToggle}/>
            </div>
            <div className="textBlock">
                <span className="title">{data.title || data.name}</span>
                <span className="date">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;