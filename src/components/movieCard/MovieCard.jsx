import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";
import { toggleItemInWishlist } from "../../store/slices/wishlistSlice";
import { FaHeart } from "react-icons/fa";

const MovieCard = ({ data, fromSearch, mediaType }) => {
    const { url } = useSelector((state) => state.home);
    const wishlistItems = useSelector((state) => state.wishlist?.items || []);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Poster URL - Fallback if no poster exists
    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;

    // Check if movie is in the wishlist
    const isWishlisted = wishlistItems.some((wishlistItem) => wishlistItem.id === data.id);

    // Toggle wishlist item
    const handleWishlistToggle = (e) => {
        e.stopPropagation();
        dispatch(toggleItemInWishlist(data));
    };

    return (
        <div
            className="movieCard"
            onClick={() =>
                navigate(`/${data.media_type || mediaType}/${data.id}`)
            }
        >
            <div className="posterBlock">
                <Img className="posterImg" src={posterUrl} />
                
                <CircleRating rating={data.vote_average?.toFixed(1) || "N/A"} />
                
                <Genres data={data.genre_ids.slice(0, 2)} />

                <FaHeart
                    className={`heartIcon ${isWishlisted ? "red" : ""}`}
                    onClick={handleWishlistToggle}
                />
            </div>

            {/* Movie Title and Release Date */}
            <div className="textBlock">
                <span className="title">{data.title || data.name || "Title Not Available"}</span>
                <span className="date">
                    {data.release_date ? dayjs(data.release_date).format("MMM D, YYYY") : "Unknown Date"}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;
