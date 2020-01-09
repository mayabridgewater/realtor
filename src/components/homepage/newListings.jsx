import React from 'react';
import {getApartmentsFromServer} from "../dataFromServer";
import Gallery from "../gallery/gallery";
import {Link} from "react-router-dom";

class NewListings extends React.Component {
    constructor() {
        super();
        this.state = {
            apartments: []
        }
    }

    componentDidMount() {
        getApartmentsFromServer(this.handleSuccess)
    }

    handleSuccess = (success) => {
        let apartments = [];
        for (let i = 0; i < 4; i++) {
            apartments.push(success[Math.floor(Math.random() * success.length)])
        }
        this.setState({
            apartments: apartments
        })
    };

    render() {
        const {apartments} = this.state;
        const {returnFavorites, favorites} = this.props;
        return (
            <div id={'newListing'} className={'container'}>
                <h1>New Listings in New York, NY</h1>
                <a href={'/'}>View All 38 Listings</a>
                {apartments && <Gallery apartments={apartments} returnFavorites={returnFavorites}/>}
                <Link to={'/favorites'}><p>{favorites.length} Favorite Homes</p></Link>
            </div>
        );
    }
}

export default NewListings