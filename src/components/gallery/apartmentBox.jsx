import React from 'react';
import InfoBox from "./infobox";
import OverImage from "./overimage";
import {Link} from "react-router-dom";
import Heart from "../favorites/heart";

class ApartmentBox extends React.Component {
    constructor() {
        super();
        this.state = {
            mainImage: true
        }
    }

    changeImage = () => {
        this.setState({
            mainImage: !this.state.mainImage
        })
    };


    render() {
        const {id, price, main_image, images, number_of_beds, number_of_rooms, sqft, address, length, apartments, returnFavorites} = this.props;
        let image;
        this.state.mainImage ? image = main_image : image = images[0];
        return (
            <div id={'container'} className={length === 4 ? 'slideMain' : 'col-sm-6 col-md-4 col-lg-3'} style={{position: 'relative'}}>
                <Link to={`/apartment/${id}`}><div className={'box'}>
                    <div className={'imageBox'} style={{backgroundImage: `url(./images/apartment/${image})`}} onMouseOver={this.changeImage} onMouseOut={() => this.changeImage(false)}>
                        <OverImage price={price}/>
                    </div>
                    <InfoBox beds={number_of_beds}
                             baths={number_of_rooms}
                             sqft={sqft}
                             address={address}
                             length={length}/>
                </div>
            </Link>
                <Heart apartmentId={id} locationId={1} apartments={apartments} returnFavorites={returnFavorites}/>
            </div>
        )}
}

export default ApartmentBox
