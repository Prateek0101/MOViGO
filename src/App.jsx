import { useState , useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from './utils/api';

import { useSelector, useDispatch } from 'react-redux';

import { getApiConfiguration, getGenres } from './store/homeSlice';

import SignupPage from './pages/signUp/SignupPage';
import LoginPage from "./pages/login/LoginPage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import Wishlist from './pages/wishlist/WishList';
import ProtectedRoute from './context/ProtectedRoute';


function App() {
  const dispatch=useDispatch();
  const {url}= useSelector((state)=>state.home);
  
  useEffect(()=>{
    fetchApiConfig();
    genresCall();
  },[]);
  
  const fetchApiConfig=async()=>{
    try {
      const res = await fetchDataFromApi("/configuration");
      if(!res || !res.images){
        console.error("API response is missing 'images' data:",res);
        return;
      }
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    }
    catch(error){
      console.log("Error fetching API configuration:",error);
    }
    // fetchDataFromApi('/configuration')
    // .then((res)=>{
    //   console.log(res);
    // it was not handling the error properly because if res is null res.images becomes undefined
  };
  const genresCall = async () => {
    let promises  = []
    let endPoint = ["tv", "movie"]
    let allGenres = {}

    endPoint.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises);
    console.log(data);
    data.map(({genres}) => {
      return genres.map((item) => (allGenres[item.id] = item))
    })

    dispatch(getGenres(allGenres));
  }
  return (
  <BrowserRouter>
  <Header/>
    <Routes>
      <Route path='/' element={<navigate to='/login'/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path="/" element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>}/>
      <Route path="/:mediaType/:id" element={<Details/>}/>
      <Route path="/search/:query" element={<SearchResult/>}/>
      <Route path="/explore/:mediaType" element={<Explore/>}/>
      <Route path="/wishlist" element={<Wishlist/>} />
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
    <Footer/>
  </BrowserRouter>);
}

export default App;
