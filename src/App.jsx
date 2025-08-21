import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { fetchDataFromApi } from './utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice';

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import Wishlist from './pages/wishlist/WishList';
import Signin from './pages/signIn/SignIn';
import Signup from './pages/signUp/SignUp';
import useLoadWishlist from './pages/wishlist/loadWishlist';


function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  const location = useLocation();
  const hideHeader = location.pathname === "/" && "/signup";


  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  
  
  const fetchApiConfig = async () => {
    try {
      const res = await fetchDataFromApi("/configuration");
      if (!res || !res.images) {
        console.error("API response is missing 'images' data:", res);
        return;
      }
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    } catch (error) {
      console.log("Error fetching API configuration:", error);
    }
  };
  
  const genresCall = async () => {
    let promises = [];
    let endPoint = ["tv", "movie"];
    let allGenres = {};

    endPoint.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    console.log(data);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };
  
  useLoadWishlist();

  return (
    <>
    {!hideHeader && <Header/>}
    <Routes>
      <Route path="/" element={<Signin/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/:home" element={<Home />} />
      <Route path="/:mediaType/:id" element={<Details />} />
      <Route path="/search/:query" element={<SearchResult />} />
      <Route path="/explore/:mediaType" element={<Explore />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    <Footer />
    </>
  );
}

const rootApp = () =>{
  return(<BrowserRouter>
    <App />
  </BrowserRouter>
)}

export default rootApp;
