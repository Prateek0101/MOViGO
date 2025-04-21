import React from "react";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setWishlistItems } from "../../store/slices/wishlistSlice";
import "./style.scss";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";

const WishList = () => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.wishlist.items);
    useEffect (() => {
        const fetchWishlist = async () => {
            const user = JSON.parse(localStorage.getItem("movigoUser"));
            console.log(user);
            if(user?.id){
                try{
                    const res = await fetch(`http://localhost:5000/api/wishlist/${user.id}`)
                    const data = await res.json()
                    dispatch(setWishlistItems(data)) 
                }
                catch(err){ console.log("Wishlist fetch error : ",err)}
            }
        }
        fetchWishlist();
    },[dispatch])

    return (
        <div className="explorePage">
            {/* Page Header */}
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">Your Wishlist</div>
                </div>

                {/* Check if wishlist is empty */}
                {wishlistItems.length === 0 ? (
                    <span className="resultNotFound">Your wishlist is empty!</span>
                ) : (
                    // Infinite Scroll for showing wishlist items
                    <InfiniteScroll
                        className="content"
                        dataLength={wishlistItems.length}  // Number of items loaded so far
                        hasMore={false}  // No pagination for now, assuming it's a static list
                        loader={<Spinner />}  // Loading spinner while fetching
                    >
                        {/* Render each wishlist item */}
                        {wishlistItems.map((item, index) => (
                            <MovieCard key={index} data={item} mediaType={item.media_type} />
                        ))}
                    </InfiniteScroll>
                )}
            </ContentWrapper>
        </div>
    );
};

export default WishList;
