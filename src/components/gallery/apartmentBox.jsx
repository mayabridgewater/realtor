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
        const {id, price, main_image, images, number_of_room, number_of_bath, sqft, address, city_name, name, apartments, returnFavorites} = this.props;
        console.log(main_image);
        return (
            <div id={'container'} className={'col-sm-6 col-md-4 col-lg-3'} style={{position: 'relative'}}>
                <Link to={`/apartment/${id}`}><div className={'box'}>
                    <div className={'imageBox'} style={{backgroundImage: `url("http://localhost:3000${main_image}")`}} onMouseOver={this.changeImage} onMouseOut={() => this.changeImage(false)}>
                        <OverImage price={price}/>
                    </div>
                    <InfoBox beds={number_of_room}
                             baths={number_of_bath}
                             sqft={sqft}
                             address={address}
                             city={city_name}
                             country= {name}/>
                </div>
            </Link>
                {/* <Heart apartmentId={id} locationId={1} apartments={apartments} returnFavorites={returnFavorites}/> */}
            </div>
        )}
}

export default ApartmentBox
