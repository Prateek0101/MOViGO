import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import "./style.scss";
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const {url}= useSelector((state) => state.home);
  const {data,loading} = useFetch("/movie/upcoming") || [{ results: [] }, false];
  
  useEffect(() => {
    if (data?.results && data.results.length > 0) {  // Ensure data and results exist and are not empty
      const randomIndex = Math.floor(Math.random() * data.results.length); //Use the correct length
      const backdropPath = data.results[randomIndex].backdrop_path;

      if (backdropPath) { // Make sure backdrop_path is not null or undefined
        const bg = url.backdrop + backdropPath;
        setBackground(bg);
      } else {
        console.warn("No backdrop_path found in the API response.");
      }
    } else {
      console.warn("No results found in API response.");
    }
  }, [data, url]);
  const searchQueryHandler = (event) =>{
    if(event.key === "Enter" && query.length>0){
      navigate(`/search/${query}`)
    }
  }

  return (
    <div className="heroBanner">
      {!loading && <div className="backdrop-img">
        <Img src={background} />;
    </div>}
      
    <div className="opacity-layer"></div>
      
    <ContentWrapper>
      <div className="heroBannerContent">
        <span className="title">Welcome.</span>
          <span className="subTitle">Millions of movies,Tv shows and people to discover.
          Explore now.</span>
          <div className="searchInput">
            <input type="text"
                    placeholder="Search for a movie or tv show..."
                    onChange={(e)=>setQuery(e.target.value)}
                    onKeyUp={searchQueryHandler}
            />
                    <button>Search</button>
          </div>
      </div>
    </ContentWrapper>
    </div>
  );
}

export default HeroBanner;