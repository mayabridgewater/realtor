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
        const {id, user_id, address, city_id, price, number_of_room, number_of_bath, sqft, created_on, 
               description, sale_status, availability, property_type, status_id, main_image, city_name,
               country_id, name, code} = this.props;
        let image;
        // this.state.mainImage ? image = main_image : image = images[0];
        return (
            <div id={'container'} className={'col-sm-6 col-md-4 col-lg-3'} style={{position: 'relative'}}>
                <Link to={`/apartment/${id}`}><div className={'box'}>
                    <div className={'imageBox'} style={{backgroundImage: `url(./images/apartment/${image})`}} onMouseOver={this.changeImage} onMouseOut={() => this.changeImage(false)}>
                        <OverImage price={price}/>
                    </div>
                    <InfoBox beds={number_of_room}
                             baths={number_of_bath}
                             sqft={sqft}
                             address={address}
                             city={city_name}
                             country={name}/>
                </div>
            </Link>
                {/* <Heart apartmentId={id} locationId={1} apartments={apartments} returnFavorites={returnFavorites}/> */}
            </div>
        )}
}

export default ApartmentBox
