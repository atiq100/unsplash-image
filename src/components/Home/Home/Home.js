import React from 'react';
import { Nav } from '../../Nav/Nav';
import PhotoList from '../../SearchItem/PhotoList';
import SearchItem from '../../SearchItem/SearchItem';
import ImageGallery from './ImageGallery';

const Home = () => {
    return (
        <div>
            <Nav></Nav>
            <SearchItem></SearchItem>
            {/* <PhotoList></PhotoList> */}
            <ImageGallery></ImageGallery>
            
        </div>
    );
};

export default Home;