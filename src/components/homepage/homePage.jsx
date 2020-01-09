import React from 'react';
import SubHeader from "./subHeader";
import Main from "./main";
import Header from "../header/header";
import NewListings from "./newListings";
import WhatsHappening from "./whatsHappening";
import Trends from "./trends";
import Ads from "./ads";
import BottomSection from "./bottomSection";
import TopDirectory from "./topDirectory";
import BottomDirectory from "./bottomDirectory";
import Footer from "../footer/footer";

class Homepage extends React.Component {
    render() {
        const {returnFavorites, favorites} = this.props;
        return (
            <div>
                <Header/>
                <SubHeader/>
                <Main/>
                <NewListings returnFavorites={returnFavorites} favorites={favorites}/>
                <WhatsHappening/>
                <Trends/>
                <Ads/>
                <BottomSection/>
                <TopDirectory/>
                <BottomDirectory/>
                <Footer id={1}/>
            </div>
        )
    }
}

export default Homepage