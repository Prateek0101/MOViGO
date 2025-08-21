import React, { useState, useEffect, useRef } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/Logo.png";
import WishList from "../../pages/wishlist/WishList";
import { useSelector } from "react-redux";

const Header = () => {
    const [show, setShow] = useState("top");
    const lastScrollY = useRef(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const wishlist = useSelector((state) => state.wishlist);
    const wishlistCount = (wishlist?.movies?.length || 0) + (wishlist?.tvShow?.length || 0) ;  

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    const controlNavbar = () => {
        console.log(window.scrollY);
        localStorage.setItem("lastScrollY", window.scrollY); // Save scroll value
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY.current && !mobileMenu) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        lastScrollY.current = window.scrollY;
    };

    useEffect(() => {
        const savedScrollY = localStorage.getItem("lastScrollY");
        if (savedScrollY) {
            lastScrollY.current = parseInt(savedScrollY);
            // console.log(`Restored scroll position: ${savedScrollY}`);
        }

        window.addEventListener("scroll", controlNavbar);
        return () => window.removeEventListener("scroll", controlNavbar);
    }, []);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
            setTimeout(() => setShowSearch(false), 1000);
        }
    };

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    };

    const openMobileMenu = () => {
        setMobileMenu((prev) => !prev);
        setShowSearch(false);
    };

    const navigationHandler = (type) => {
        if(type === 'movie'){
            navigate('/explore/movie');
        }
        else if(type === 'tv'){
            navigate('/explore/tv')
        }
        else if(type === "wishlist"){
            navigate('/wishlist')
        }
        setMobileMenu(false);
    };

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo" onClick={() => navigate("/home")}>
                    <img src={logo} alt="logo" />
                </div>
                <ul className="menuItems">
                    <li className="menuItem" onClick={() => navigationHandler("movie")}>Movies</li>
                    <li className="menuItem" onClick={() => navigationHandler("tv")}>TV Shows</li>
                    <li className="menuItem" onClick={() => navigationHandler("wishlist")}>Wishlist</li>
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
                </ul>
                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch} />
                    {mobileMenu ? (
                        <VscChromeClose onClick={() => setMobileMenu(false)} />
                    ) : (
                        <SlMenu onClick={openMobileMenu} />
                    )}
                </div>
            </ContentWrapper>
            {showSearch && (
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder="Search for a movie or tv show..."
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                            <VscChromeClose onClick={() => setShowSearch(false)} />
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </header>
    );
};

export default Header;
