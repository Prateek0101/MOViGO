import React, { useRef, useState } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import "./style.scss";

import { toggleItemInWishlist } from '../../store/slices/wishlistSlice';

const Carousel = ({ data, loading, endpoint, title, mediaType }) => {
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const wishlistItems = useSelector((state) => state.wishlist?.items || []);

    const navigation = (dir) => {
        const container = carouselContainer.current;
        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({ left: scrollAmount, behavior: "smooth" });
    };

    const toggleLike = (items) => {
        dispatch(toggleItemInWishlist(items));
    };

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock"></div>
                <div className="textBlock">
                    <div className="title"></div>
                    <div className="date"></div>
                </div>
            </div>
        );
    };

    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRightNav arrow"
                    onClick={() => navigation("right")}
                />
                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item) => {
                            const posterUrl = item.poster_path
                                ? url.poster + item.poster_path
                                : PosterFallback;


                            const isWishlisted = wishlistItems.some((wishlistItems) => wishlistItems.id === item.id)

                            return (
                                <div
                                    key={item.id}
                                    className="carouselItem"
                                    onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}
                                >
                                    <div className="posterBlock">
                                        <Img src={posterUrl} />
                                        <FaHeart 
                                            className={`heartIcon ${isWishlisted ? "red" : ""}`}
                                            onClick={(e) => {
                                            e.stopPropagation();
                                            toggleLike(item);
                                          }}/>
                                        <CircleRating rating={item.vote_average.toFixed(1)} />
                                        <Genres data={item.genre_ids.slice(0, 2)} />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">{item.title || item.name}</span>
                                        <span className="date">
                                            {item.release_date
                                                ? dayjs(item.release_date).format("MMM D, YYYY")
                                                : "Unknown Date"}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Carousel;
