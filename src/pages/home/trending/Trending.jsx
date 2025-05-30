import React, { useState } from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/switchTabs';

import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';
const Trending = () => {
  const [endpoint, setEndpoint]=useState("day");

  const {data,loading} = useFetch(`/trending/all/${endpoint}`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Day" ? "day" : "week")
  };

  return (
    <div className='carouselSection'>
      <ContentWrapper>
        <div className="title">
          <span className='carouselTitle'>Trending</span>
          <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
        </div>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading}/>
    </div>
  );
};

export default Trending;
