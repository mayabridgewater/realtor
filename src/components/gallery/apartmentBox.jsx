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
<<<<<<< HEAD
        const {id, user_id, address, city_id, price, number_of_room, number_of_bath, sqft, created_on, 
               description, sale_status, availability, property_type, status_id, main_image, city_name,
               country_id, name, code} = this.props;
        let image;
        // this.state.mainImage ? image = main_image : image = images[0];
=======
        const {id, price, main_image, images, number_of_room, number_of_bath, sqft, address, city_name, name, apartments, returnFavorites} = this.props;
        console.log(main_image);
>>>>>>> 2fcdedd5eca259d68d672d161673639df54b68ac
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
<<<<<<< HEAD
                             country={name}/>
=======
                             country= {name}/>
>>>>>>> 2fcdedd5eca259d68d672d161673639df54b68ac
                </div>
            </Link>
                {/* <Heart apartmentId={id} locationId={1} apartments={apartments} returnFavorites={returnFavorites}/> */}
            </div>
        )}
}

export default ApartmentBox
