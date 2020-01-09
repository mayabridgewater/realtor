import React from 'react';
import Header from "../header/header";
import Liked from "./liked";

class Favorites extends React.Component {
    render() {
        const {favorites, returnFavorites} = this.props;
        return (
            <div>
                <Header/>
                <Liked favorites={favorites} returnFavorites={returnFavorites}/>
            </div>
        );
    }
}

export default Favorites