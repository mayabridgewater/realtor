import React from 'react';
import ApartmentBox from "../gallery/apartmentBox";

class Liked extends React.Component {
    render() {
        const {favorites, returnFavorites} = this.props;
        return (
            <div className={'favorites'}>
                <div className={'container-fluid'}>
                    <h2>Your Favorite Homes</h2>
                    <div className={'row'}>
                        {favorites.map((item, i) => <ApartmentBox {...item} key={i} returnFavorites={returnFavorites}/>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Liked