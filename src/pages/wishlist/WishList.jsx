import React from "react";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";

const WishList = () => {
    const wishlistItems = useSelector((state) => state.wishlist?.items || []);

    return (                                  
        <div className="explorePage"> {/* Keep the same styling as Explore Page */}
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">Your Wishlist</div>
                </div>
                {wishlistItems.length === 0 ? (
                    <span className="resultNotFound">Your wishlist is empty!</span>
                ) : (
                    <InfiniteScroll
                        className="content"
                        dataLength={wishlistItems.length}
                        hasMore={false} // No need for pagination
                        loader={<Spinner />}
                    >
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
