import React from 'react';
import InfoBox from "./infobox";
import OverImage from "./overimage";
import {Link} from "react-router-dom";

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
        const {id, price, main_image, number_of_room, number_of_bath, sqft, address, city_name, name, created_on, sale_status, property_type} = this.props;
        return (
                <Link to={`/apartment/${id}`} style={{textDecoration: 'none'}}><div className={'box'}>
                    <div className={'imageBox'} style={{backgroundImage: `url("http://localhost:3000${main_image}")`}} onMouseOver={this.changeImage} onMouseOut={() => this.changeImage(false)}>
                        <OverImage price={price}
                                   date={created_on}
                                   sale_status={sale_status}
                                   property_type={property_type}/>
                    </div>
                    <InfoBox beds={number_of_room}
                             baths={number_of_bath}
                             sqft={sqft}
                             address={address}
                             city={city_name}
                             country= {name}/>
                </div>
            </Link>
        )}
}

export default ApartmentBox
